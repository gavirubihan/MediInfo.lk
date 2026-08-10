/**
 * Firebase Data Connect Client
 * 
 * Communicates with the Data Connect emulator (local dev) or 
 * production Cloud SQL via Data Connect HTTP endpoint.
 * 
 * The Data Connect emulator runs at port 9399 and accepts
 * GraphQL-style HTTP requests.
 */

const DATACONNECT_EMULATOR_URL = 'http://127.0.0.1:9399/v1alpha/projects/mediinfo-lk/locations/us-central1/services/mediinfo-dataconnect:executeGraphql';

async function executeGraphql(query: string, variables?: Record<string, any>) {
  // Extract operation name (e.g. "query ListMedicines" -> "ListMedicines")
  const opMatch = query.match(/(?:query|mutation)\s+([A-Za-z0-9_]+)/);
  const operationName = opMatch ? opMatch[1] : '';
  const isMutation = query.trim().startsWith('mutation');

  const endpoint = isMutation ? 'executeMutation' : 'executeQuery';
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const url = `https://firebasedataconnect.googleapis.com/v1alpha/projects/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}/locations/us-east4/services/mediinfo-lk-service/connectors/default:${endpoint}?key=${apiKey}`;
  const body = JSON.stringify({ operationName, variables: variables || {} });

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Data Connect error ${res.status}: ${text}`);
  }

  const json = await res.json();
  if (json.errors && json.errors.length > 0) {
    throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
  }
  return json.data;
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MedicineListItem {
  id: string;
  slug: string;
  genericName: string;
  chemicalName: string;
  category: string;
  brandNames: string[];
  form: string[];
  strength: string;
  verified: boolean;
  prescriptionRequired: boolean;
  createdDate: string;
}

export interface MedicineFull extends MedicineListItem {
  ageGroup: string;
  maxDailyDoseAdults: string;
  safetyPregnancy: string;
  safetyBreastfeeding: string;
  safetyElderly: string;
  safetyChildren: string;
  dosageRows: { id: string; ageGroup: string; dose: string; frequency: string; maxPerDay: string }[];
  drugInteractions: { id: string; drug: string; note: string }[];
  localizedContents: {
    id: string;
    language: string;
    description: string;
    howItWorks: string;
    dosageNotes: string;
    usedFor: string[];
    sideEffectsCommon: string[];
    sideEffectsLessCommon: string[];
    sideEffectsSerious: string[];
    warningCards: { id: string; title: string; severity: string; text: string }[];
  }[];
}

// ─── Queries ──────────────────────────────────────────────────────────────────

export async function listMedicines(): Promise<MedicineListItem[]> {
  const data = await executeGraphql(`
    query ListMedicines {
      medicines {
        id slug genericName chemicalName category brandNames form strength verified prescriptionRequired createdDate
      }
    }
  `);
  return data?.medicines ?? [];
}

export async function getMedicineBySlug(slug: string): Promise<MedicineFull | null> {
  const data = await executeGraphql(`
    query GetMedicineBySlug($slug: String!) {
      medicines(where: {slug: {eq: $slug}}) {
        id slug genericName chemicalName category brandNames form strength ageGroup
        prescriptionRequired verified maxDailyDoseAdults createdDate
        safetyPregnancy safetyBreastfeeding safetyElderly safetyChildren
        dosageRows_on_medicine { id ageGroup dose frequency maxPerDay }
        drugInteractions_on_medicine { id drug note }
        medicineLocalizedContents_on_medicine {
          id language description howItWorks dosageNotes
          usedFor sideEffectsCommon sideEffectsLessCommon sideEffectsSerious
          warningCards_on_localizedContent { id title severity text }
        }
      }
    }
  `, { slug });

  const m = data?.medicines?.[0];
  if (!m) return null;
  return {
    ...m,
    dosageRows: m.dosageRows_on_medicine ?? [],
    drugInteractions: m.drugInteractions_on_medicine ?? [],
    localizedContents: (m.medicineLocalizedContents_on_medicine ?? []).map((lc: any) => ({
      ...lc,
      warningCards: lc.warningCards_on_localizedContent ?? [],
    })),
  };
}

// ─── Mutations ────────────────────────────────────────────────────────────────

export async function createMedicine(input: {
  slug: string;
  genericName: string;
  chemicalName: string;
  category: string;
  strength: string;
  ageGroup: string;
  prescriptionRequired: boolean;
  verified: boolean;
  maxDailyDoseAdults: string;
  safetyPregnancy: string;
  safetyBreastfeeding: string;
  safetyElderly: string;
  safetyChildren: string;
  brandNames: string[];
  form: string[];
  createdDate: string;
}): Promise<string> {
  const data = await executeGraphql(`
    mutation CreateMedicine(
      $slug: String!, $genericName: String!, $chemicalName: String!, 
      $category: String!, $strength: String!, $ageGroup: String!,
      $prescriptionRequired: Boolean!, $verified: Boolean!, 
      $maxDailyDoseAdults: String!, $safetyPregnancy: String!, 
      $safetyBreastfeeding: String!, $safetyElderly: String!, 
      $safetyChildren: String!, $brandNames: [String!]!, $form: [String!]!,
      $createdDate: String!
    ) {
      medicine_insert(data: {
        slug: $slug, genericName: $genericName, chemicalName: $chemicalName,
        category: $category, strength: $strength, ageGroup: $ageGroup,
        prescriptionRequired: $prescriptionRequired, verified: $verified,
        maxDailyDoseAdults: $maxDailyDoseAdults, safetyPregnancy: $safetyPregnancy,
        safetyBreastfeeding: $safetyBreastfeeding, safetyElderly: $safetyElderly,
        safetyChildren: $safetyChildren, brandNames: $brandNames, form: $form,
        createdDate: $createdDate
      })
    }
  `, input);
  return typeof data.medicine_insert === 'string' ? data.medicine_insert : data.medicine_insert.id;
}

export async function createLocalizedContent(input: {
  medicineId: string;
  language: string;
  description: string;
  howItWorks: string;
  dosageNotes: string;
  usedFor: string[];
  sideEffectsCommon: string[];
  sideEffectsLessCommon: string[];
  sideEffectsSerious: string[];
}): Promise<string> {
  const data = await executeGraphql(`
    mutation CreateMedicineLocalizedContent(
      $medicineId: UUID!, $language: String!, $description: String!,
      $howItWorks: String!, $dosageNotes: String!, $usedFor: [String!]!,
      $sideEffectsCommon: [String!]!, $sideEffectsLessCommon: [String!]!,
      $sideEffectsSerious: [String!]!
    ) {
      medicineLocalizedContent_insert(data: {
        medicineId: $medicineId, language: $language, description: $description,
        howItWorks: $howItWorks, dosageNotes: $dosageNotes, usedFor: $usedFor,
        sideEffectsCommon: $sideEffectsCommon, sideEffectsLessCommon: $sideEffectsLessCommon,
        sideEffectsSerious: $sideEffectsSerious
      })
    }
  `, input);
  return typeof data.medicineLocalizedContent_insert === 'string' ? data.medicineLocalizedContent_insert : data.medicineLocalizedContent_insert.id;
}

export async function createDosageRow(input: {
  medicineId: string;
  ageGroup: string;
  dose: string;
  frequency: string;
  maxPerDay: string;
}): Promise<void> {
  await executeGraphql(`
    mutation CreateDosageRow($medicineId: UUID!, $ageGroup: String!, $dose: String!, $frequency: String!, $maxPerDay: String!) {
      dosageRow_insert(data: { medicineId: $medicineId, ageGroup: $ageGroup, dose: $dose, frequency: $frequency, maxPerDay: $maxPerDay })
    }
  `, input);
}

export async function createWarningCard(input: {
  localizedContentId: string;
  title: string;
  severity: string;
  text: string;
}): Promise<void> {
  await executeGraphql(`
    mutation CreateWarningCard($localizedContentId: UUID!, $title: String!, $severity: String!, $text: String!) {
      warningCard_insert(data: { localizedContentId: $localizedContentId, title: $title, severity: $severity, text: $text })
    }
  `, input);
}

export async function createDrugInteraction(input: {
  medicineId: string;
  drug: string;
  note: string;
}): Promise<void> {
  await executeGraphql(`
    mutation CreateDrugInteraction($medicineId: UUID!, $drug: String!, $note: String!) {
      drugInteraction_insert(data: { medicineId: $medicineId, drug: $drug, note: $note })
    }
  `, input);
}

export async function createMedicineVerification(input: {
  medicineId: string;
  doctorId: string;
  slmcRegNo: string;
  verifiedAt: string;
}): Promise<void> {
  await executeGraphql(`
    mutation CreateMedicineVerification($medicineId: UUID!, $doctorId: String!, $slmcRegNo: String!, $verifiedAt: String!) {
      medicineVerification_insert(data: {
        medicineId: $medicineId, doctorId: $doctorId, slmcRegNo: $slmcRegNo, verifiedAt: $verifiedAt
      })
    }
  `, input);
}

export async function setMedicineVerified(id: string, verified: boolean): Promise<void> {
  await executeGraphql(`
    mutation SetMedicineVerified($id: UUID!, $verified: Boolean!) {
      medicine_update(id: $id, data: { verified: $verified })
    }
  `, { id, verified });
}

export async function updateMedicineCore(input: {
  id: string;
  slug: string;
  genericName: string;
  chemicalName: string;
  category: string;
  strength: string;
  ageGroup: string;
  prescriptionRequired: boolean;
  verified: boolean;
  maxDailyDoseAdults: string;
  safetyPregnancy: string;
  safetyBreastfeeding: string;
  safetyElderly: string;
  safetyChildren: string;
  brandNames: string[];
  form: string[];
  createdDate: string;
}): Promise<boolean> {
  await executeGraphql(`
    mutation UpdateMedicineCore(
      $id: UUID!, $slug: String!, $genericName: String!, $chemicalName: String!, 
      $category: String!, $strength: String!, $ageGroup: String!,
      $prescriptionRequired: Boolean!, $verified: Boolean!, 
      $maxDailyDoseAdults: String!, $safetyPregnancy: String!, 
      $safetyBreastfeeding: String!, $safetyElderly: String!, 
      $safetyChildren: String!, $brandNames: [String!]!, $form: [String!]!,
      $createdDate: String!
    ) {
      medicine_update(id: $id, data: {
        slug: $slug, genericName: $genericName, chemicalName: $chemicalName,
        category: $category, strength: $strength, ageGroup: $ageGroup,
        prescriptionRequired: $prescriptionRequired, verified: $verified,
        maxDailyDoseAdults: $maxDailyDoseAdults, safetyPregnancy: $safetyPregnancy,
        safetyBreastfeeding: $safetyBreastfeeding, safetyElderly: $safetyElderly,
        safetyChildren: $safetyChildren, brandNames: $brandNames, form: $form,
        createdDate: $createdDate
      })
    }
  `, input);
  return true;
}

export async function deleteMedicineRelations(medicineId: string): Promise<boolean> {
  await executeGraphql(`
    mutation DeleteMedicineRelations($medicineId: UUID!) {
      dosageRow_deleteMany(where: { medicineId: { eq: $medicineId } })
      drugInteraction_deleteMany(where: { medicineId: { eq: $medicineId } })
      medicineLocalizedContent_deleteMany(where: { medicineId: { eq: $medicineId } })
    }
  `, { medicineId });
  return true;
}
