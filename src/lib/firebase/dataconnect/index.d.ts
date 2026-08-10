import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateDosageRowData {
  dosageRow_insert: DosageRow_Key;
}

export interface CreateDosageRowVariables {
  medicineId: UUIDString;
  ageGroup: string;
  dose: string;
  frequency: string;
  maxPerDay: string;
}

export interface CreateDrugInteractionData {
  drugInteraction_insert: DrugInteraction_Key;
}

export interface CreateDrugInteractionVariables {
  medicineId: UUIDString;
  drug: string;
  note: string;
}

export interface CreateMedicineData {
  medicine_insert: Medicine_Key;
}

export interface CreateMedicineLocalizedContentData {
  medicineLocalizedContent_insert: MedicineLocalizedContent_Key;
}

export interface CreateMedicineLocalizedContentVariables {
  medicineId: UUIDString;
  language: string;
  description: string;
  howItWorks: string;
  dosageNotes: string;
  usedFor: string[];
  sideEffectsCommon: string[];
  sideEffectsLessCommon: string[];
  sideEffectsSerious: string[];
}

export interface CreateMedicineVariables {
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
}

export interface CreateMedicineVerificationData {
  medicineVerification_insert: MedicineVerification_Key;
}

export interface CreateMedicineVerificationVariables {
  medicineId: UUIDString;
  doctorId: string;
  slmcRegNo: string;
  verifiedAt: string;
}

export interface CreateStaffAccountData {
  staffAccount_insert: StaffAccount_Key;
}

export interface CreateStaffAccountVariables {
  firebaseUid: string;
  email: string;
  name: string;
  profession: string;
  slmcRegNo: string;
  proofUrl: string;
  status: string;
  hospital?: string | null;
  specialization?: string | null;
  createdAt: string;
}

export interface CreateWarningCardData {
  warningCard_insert: WarningCard_Key;
}

export interface CreateWarningCardVariables {
  localizedContentId: UUIDString;
  title: string;
  severity: string;
  text: string;
}

export interface DeleteMedicineRelationsData {
  dosageRow_deleteMany: number;
  drugInteraction_deleteMany: number;
  medicineLocalizedContent_deleteMany: number;
}

export interface DeleteMedicineRelationsVariables {
  medicineId: UUIDString;
}

export interface DosageRow_Key {
  id: UUIDString;
  __typename?: 'DosageRow_Key';
}

export interface DrugInteraction_Key {
  id: UUIDString;
  __typename?: 'DrugInteraction_Key';
}

export interface GetMedicineBySlugData {
  medicines: ({
    id: UUIDString;
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
    dosageRows_on_medicine: ({
      id: UUIDString;
      ageGroup: string;
      dose: string;
      frequency: string;
      maxPerDay: string;
    } & DosageRow_Key)[];
    drugInteractions_on_medicine: ({
      id: UUIDString;
      drug: string;
      note: string;
    } & DrugInteraction_Key)[];
    medicineVerifications_on_medicine: ({
      id: UUIDString;
      doctorId: string;
      slmcRegNo: string;
      verifiedAt: string;
    } & MedicineVerification_Key)[];
    medicineLocalizedContents_on_medicine: ({
      id: UUIDString;
      language: string;
      description: string;
      howItWorks: string;
      dosageNotes: string;
      usedFor: string[];
      sideEffectsCommon: string[];
      sideEffectsLessCommon: string[];
      sideEffectsSerious: string[];
      warningCards_on_localizedContent: ({
        id: UUIDString;
        title: string;
        severity: string;
        text: string;
      } & WarningCard_Key)[];
    } & MedicineLocalizedContent_Key)[];
  } & Medicine_Key)[];
}

export interface GetMedicineBySlugVariables {
  slug: string;
}

export interface GetStaffAccountByFirebaseUidData {
  staffAccounts: ({
    id: UUIDString;
    firebaseUid: string;
    email: string;
    name: string;
    profession: string;
    slmcRegNo: string;
    proofUrl: string;
    status: string;
    hospital?: string | null;
    specialization?: string | null;
    createdAt: string;
  } & StaffAccount_Key)[];
}

export interface GetStaffAccountByFirebaseUidVariables {
  firebaseUid: string;
}

export interface ListMedicinesData {
  medicines: ({
    id: UUIDString;
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
    dosageRows_on_medicine: ({
      id: UUIDString;
      ageGroup: string;
      dose: string;
      frequency: string;
      maxPerDay: string;
    } & DosageRow_Key)[];
    drugInteractions_on_medicine: ({
      id: UUIDString;
      drug: string;
      note: string;
    } & DrugInteraction_Key)[];
    medicineVerifications_on_medicine: ({
      id: UUIDString;
      doctorId: string;
      slmcRegNo: string;
      verifiedAt: string;
    } & MedicineVerification_Key)[];
    medicineLocalizedContents_on_medicine: ({
      id: UUIDString;
      language: string;
      description: string;
      howItWorks: string;
      dosageNotes: string;
      usedFor: string[];
      sideEffectsCommon: string[];
      sideEffectsLessCommon: string[];
      sideEffectsSerious: string[];
      warningCards_on_localizedContent: ({
        id: UUIDString;
        title: string;
        severity: string;
        text: string;
      } & WarningCard_Key)[];
    } & MedicineLocalizedContent_Key)[];
  } & Medicine_Key)[];
}

export interface ListStaffAccountsData {
  staffAccounts: ({
    id: UUIDString;
    firebaseUid: string;
    email: string;
    name: string;
    profession: string;
    slmcRegNo: string;
    proofUrl: string;
    status: string;
    hospital?: string | null;
    specialization?: string | null;
    createdAt: string;
  } & StaffAccount_Key)[];
}

export interface MedicineLocalizedContent_Key {
  id: UUIDString;
  __typename?: 'MedicineLocalizedContent_Key';
}

export interface MedicineVerification_Key {
  id: UUIDString;
  __typename?: 'MedicineVerification_Key';
}

export interface Medicine_Key {
  id: UUIDString;
  __typename?: 'Medicine_Key';
}

export interface SetMedicineVerifiedData {
  medicine_update?: Medicine_Key | null;
}

export interface SetMedicineVerifiedVariables {
  id: UUIDString;
  verified: boolean;
}

export interface StaffAccount_Key {
  id: UUIDString;
  __typename?: 'StaffAccount_Key';
}

export interface UpdateMedicineCoreData {
  medicine_update?: Medicine_Key | null;
}

export interface UpdateMedicineCoreVariables {
  id: UUIDString;
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
}

export interface UpdateStaffStatusData {
  staffAccount_update?: StaffAccount_Key | null;
}

export interface UpdateStaffStatusVariables {
  id: UUIDString;
  status: string;
}

export interface WarningCard_Key {
  id: UUIDString;
  __typename?: 'WarningCard_Key';
}

interface CreateMedicineRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMedicineVariables): MutationRef<CreateMedicineData, CreateMedicineVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateMedicineVariables): MutationRef<CreateMedicineData, CreateMedicineVariables>;
  operationName: string;
}
export const createMedicineRef: CreateMedicineRef;

export function createMedicine(vars: CreateMedicineVariables): MutationPromise<CreateMedicineData, CreateMedicineVariables>;
export function createMedicine(dc: DataConnect, vars: CreateMedicineVariables): MutationPromise<CreateMedicineData, CreateMedicineVariables>;

interface CreateMedicineLocalizedContentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMedicineLocalizedContentVariables): MutationRef<CreateMedicineLocalizedContentData, CreateMedicineLocalizedContentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateMedicineLocalizedContentVariables): MutationRef<CreateMedicineLocalizedContentData, CreateMedicineLocalizedContentVariables>;
  operationName: string;
}
export const createMedicineLocalizedContentRef: CreateMedicineLocalizedContentRef;

export function createMedicineLocalizedContent(vars: CreateMedicineLocalizedContentVariables): MutationPromise<CreateMedicineLocalizedContentData, CreateMedicineLocalizedContentVariables>;
export function createMedicineLocalizedContent(dc: DataConnect, vars: CreateMedicineLocalizedContentVariables): MutationPromise<CreateMedicineLocalizedContentData, CreateMedicineLocalizedContentVariables>;

interface CreateDosageRowRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateDosageRowVariables): MutationRef<CreateDosageRowData, CreateDosageRowVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateDosageRowVariables): MutationRef<CreateDosageRowData, CreateDosageRowVariables>;
  operationName: string;
}
export const createDosageRowRef: CreateDosageRowRef;

export function createDosageRow(vars: CreateDosageRowVariables): MutationPromise<CreateDosageRowData, CreateDosageRowVariables>;
export function createDosageRow(dc: DataConnect, vars: CreateDosageRowVariables): MutationPromise<CreateDosageRowData, CreateDosageRowVariables>;

interface CreateDrugInteractionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateDrugInteractionVariables): MutationRef<CreateDrugInteractionData, CreateDrugInteractionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateDrugInteractionVariables): MutationRef<CreateDrugInteractionData, CreateDrugInteractionVariables>;
  operationName: string;
}
export const createDrugInteractionRef: CreateDrugInteractionRef;

export function createDrugInteraction(vars: CreateDrugInteractionVariables): MutationPromise<CreateDrugInteractionData, CreateDrugInteractionVariables>;
export function createDrugInteraction(dc: DataConnect, vars: CreateDrugInteractionVariables): MutationPromise<CreateDrugInteractionData, CreateDrugInteractionVariables>;

interface CreateWarningCardRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateWarningCardVariables): MutationRef<CreateWarningCardData, CreateWarningCardVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateWarningCardVariables): MutationRef<CreateWarningCardData, CreateWarningCardVariables>;
  operationName: string;
}
export const createWarningCardRef: CreateWarningCardRef;

export function createWarningCard(vars: CreateWarningCardVariables): MutationPromise<CreateWarningCardData, CreateWarningCardVariables>;
export function createWarningCard(dc: DataConnect, vars: CreateWarningCardVariables): MutationPromise<CreateWarningCardData, CreateWarningCardVariables>;

interface DeleteMedicineRelationsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteMedicineRelationsVariables): MutationRef<DeleteMedicineRelationsData, DeleteMedicineRelationsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteMedicineRelationsVariables): MutationRef<DeleteMedicineRelationsData, DeleteMedicineRelationsVariables>;
  operationName: string;
}
export const deleteMedicineRelationsRef: DeleteMedicineRelationsRef;

export function deleteMedicineRelations(vars: DeleteMedicineRelationsVariables): MutationPromise<DeleteMedicineRelationsData, DeleteMedicineRelationsVariables>;
export function deleteMedicineRelations(dc: DataConnect, vars: DeleteMedicineRelationsVariables): MutationPromise<DeleteMedicineRelationsData, DeleteMedicineRelationsVariables>;

interface UpdateMedicineCoreRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateMedicineCoreVariables): MutationRef<UpdateMedicineCoreData, UpdateMedicineCoreVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateMedicineCoreVariables): MutationRef<UpdateMedicineCoreData, UpdateMedicineCoreVariables>;
  operationName: string;
}
export const updateMedicineCoreRef: UpdateMedicineCoreRef;

export function updateMedicineCore(vars: UpdateMedicineCoreVariables): MutationPromise<UpdateMedicineCoreData, UpdateMedicineCoreVariables>;
export function updateMedicineCore(dc: DataConnect, vars: UpdateMedicineCoreVariables): MutationPromise<UpdateMedicineCoreData, UpdateMedicineCoreVariables>;

interface CreateMedicineVerificationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMedicineVerificationVariables): MutationRef<CreateMedicineVerificationData, CreateMedicineVerificationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateMedicineVerificationVariables): MutationRef<CreateMedicineVerificationData, CreateMedicineVerificationVariables>;
  operationName: string;
}
export const createMedicineVerificationRef: CreateMedicineVerificationRef;

export function createMedicineVerification(vars: CreateMedicineVerificationVariables): MutationPromise<CreateMedicineVerificationData, CreateMedicineVerificationVariables>;
export function createMedicineVerification(dc: DataConnect, vars: CreateMedicineVerificationVariables): MutationPromise<CreateMedicineVerificationData, CreateMedicineVerificationVariables>;

interface SetMedicineVerifiedRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SetMedicineVerifiedVariables): MutationRef<SetMedicineVerifiedData, SetMedicineVerifiedVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SetMedicineVerifiedVariables): MutationRef<SetMedicineVerifiedData, SetMedicineVerifiedVariables>;
  operationName: string;
}
export const setMedicineVerifiedRef: SetMedicineVerifiedRef;

export function setMedicineVerified(vars: SetMedicineVerifiedVariables): MutationPromise<SetMedicineVerifiedData, SetMedicineVerifiedVariables>;
export function setMedicineVerified(dc: DataConnect, vars: SetMedicineVerifiedVariables): MutationPromise<SetMedicineVerifiedData, SetMedicineVerifiedVariables>;

interface CreateStaffAccountRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateStaffAccountVariables): MutationRef<CreateStaffAccountData, CreateStaffAccountVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateStaffAccountVariables): MutationRef<CreateStaffAccountData, CreateStaffAccountVariables>;
  operationName: string;
}
export const createStaffAccountRef: CreateStaffAccountRef;

export function createStaffAccount(vars: CreateStaffAccountVariables): MutationPromise<CreateStaffAccountData, CreateStaffAccountVariables>;
export function createStaffAccount(dc: DataConnect, vars: CreateStaffAccountVariables): MutationPromise<CreateStaffAccountData, CreateStaffAccountVariables>;

interface UpdateStaffStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateStaffStatusVariables): MutationRef<UpdateStaffStatusData, UpdateStaffStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateStaffStatusVariables): MutationRef<UpdateStaffStatusData, UpdateStaffStatusVariables>;
  operationName: string;
}
export const updateStaffStatusRef: UpdateStaffStatusRef;

export function updateStaffStatus(vars: UpdateStaffStatusVariables): MutationPromise<UpdateStaffStatusData, UpdateStaffStatusVariables>;
export function updateStaffStatus(dc: DataConnect, vars: UpdateStaffStatusVariables): MutationPromise<UpdateStaffStatusData, UpdateStaffStatusVariables>;

interface ListMedicinesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMedicinesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListMedicinesData, undefined>;
  operationName: string;
}
export const listMedicinesRef: ListMedicinesRef;

export function listMedicines(options?: ExecuteQueryOptions): QueryPromise<ListMedicinesData, undefined>;
export function listMedicines(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMedicinesData, undefined>;

interface GetMedicineBySlugRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMedicineBySlugVariables): QueryRef<GetMedicineBySlugData, GetMedicineBySlugVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetMedicineBySlugVariables): QueryRef<GetMedicineBySlugData, GetMedicineBySlugVariables>;
  operationName: string;
}
export const getMedicineBySlugRef: GetMedicineBySlugRef;

export function getMedicineBySlug(vars: GetMedicineBySlugVariables, options?: ExecuteQueryOptions): QueryPromise<GetMedicineBySlugData, GetMedicineBySlugVariables>;
export function getMedicineBySlug(dc: DataConnect, vars: GetMedicineBySlugVariables, options?: ExecuteQueryOptions): QueryPromise<GetMedicineBySlugData, GetMedicineBySlugVariables>;

interface ListStaffAccountsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListStaffAccountsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListStaffAccountsData, undefined>;
  operationName: string;
}
export const listStaffAccountsRef: ListStaffAccountsRef;

export function listStaffAccounts(options?: ExecuteQueryOptions): QueryPromise<ListStaffAccountsData, undefined>;
export function listStaffAccounts(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListStaffAccountsData, undefined>;

interface GetStaffAccountByFirebaseUidRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetStaffAccountByFirebaseUidVariables): QueryRef<GetStaffAccountByFirebaseUidData, GetStaffAccountByFirebaseUidVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetStaffAccountByFirebaseUidVariables): QueryRef<GetStaffAccountByFirebaseUidData, GetStaffAccountByFirebaseUidVariables>;
  operationName: string;
}
export const getStaffAccountByFirebaseUidRef: GetStaffAccountByFirebaseUidRef;

export function getStaffAccountByFirebaseUid(vars: GetStaffAccountByFirebaseUidVariables, options?: ExecuteQueryOptions): QueryPromise<GetStaffAccountByFirebaseUidData, GetStaffAccountByFirebaseUidVariables>;
export function getStaffAccountByFirebaseUid(dc: DataConnect, vars: GetStaffAccountByFirebaseUidVariables, options?: ExecuteQueryOptions): QueryPromise<GetStaffAccountByFirebaseUidData, GetStaffAccountByFirebaseUidVariables>;

