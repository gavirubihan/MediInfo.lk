# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createMedicine, createMedicineLocalizedContent, createDosageRow, createDrugInteraction, createWarningCard, deleteMedicineRelations, updateMedicineCore, createMedicineVerification, setMedicineVerified, createStaffAccount } from '@firebasegen/default-connector';


// Operation CreateMedicine:  For variables, look at type CreateMedicineVars in ../index.d.ts
const { data } = await CreateMedicine(dataConnect, createMedicineVars);

// Operation CreateMedicineLocalizedContent:  For variables, look at type CreateMedicineLocalizedContentVars in ../index.d.ts
const { data } = await CreateMedicineLocalizedContent(dataConnect, createMedicineLocalizedContentVars);

// Operation CreateDosageRow:  For variables, look at type CreateDosageRowVars in ../index.d.ts
const { data } = await CreateDosageRow(dataConnect, createDosageRowVars);

// Operation CreateDrugInteraction:  For variables, look at type CreateDrugInteractionVars in ../index.d.ts
const { data } = await CreateDrugInteraction(dataConnect, createDrugInteractionVars);

// Operation CreateWarningCard:  For variables, look at type CreateWarningCardVars in ../index.d.ts
const { data } = await CreateWarningCard(dataConnect, createWarningCardVars);

// Operation DeleteMedicineRelations:  For variables, look at type DeleteMedicineRelationsVars in ../index.d.ts
const { data } = await DeleteMedicineRelations(dataConnect, deleteMedicineRelationsVars);

// Operation UpdateMedicineCore:  For variables, look at type UpdateMedicineCoreVars in ../index.d.ts
const { data } = await UpdateMedicineCore(dataConnect, updateMedicineCoreVars);

// Operation CreateMedicineVerification:  For variables, look at type CreateMedicineVerificationVars in ../index.d.ts
const { data } = await CreateMedicineVerification(dataConnect, createMedicineVerificationVars);

// Operation SetMedicineVerified:  For variables, look at type SetMedicineVerifiedVars in ../index.d.ts
const { data } = await SetMedicineVerified(dataConnect, setMedicineVerifiedVars);

// Operation CreateStaffAccount:  For variables, look at type CreateStaffAccountVars in ../index.d.ts
const { data } = await CreateStaffAccount(dataConnect, createStaffAccountVars);


```