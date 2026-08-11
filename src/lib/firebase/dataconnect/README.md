# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `default`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListMedicines*](#listmedicines)
  - [*GetMedicineBySlug*](#getmedicinebyslug)
  - [*ListStaffAccounts*](#liststaffaccounts)
  - [*GetStaffAccountByFirebaseUid*](#getstaffaccountbyfirebaseuid)
- [**Mutations**](#mutations)
  - [*CreateMedicine*](#createmedicine)
  - [*CreateMedicineLocalizedContent*](#createmedicinelocalizedcontent)
  - [*CreateDosageRow*](#createdosagerow)
  - [*CreateDrugInteraction*](#createdruginteraction)
  - [*CreateWarningCard*](#createwarningcard)
  - [*DeleteMedicineRelations*](#deletemedicinerelations)
  - [*UpdateMedicineCore*](#updatemedicinecore)
  - [*CreateMedicineVerification*](#createmedicineverification)
  - [*SetMedicineVerified*](#setmedicineverified)
  - [*CreateStaffAccount*](#createstaffaccount)
  - [*UpdateStaffStatus*](#updatestaffstatus)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `default`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@firebasegen/default-connector` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListMedicines
You can execute the `ListMedicines` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
listMedicines(options?: ExecuteQueryOptions): QueryPromise<ListMedicinesData, undefined>;

interface ListMedicinesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMedicinesData, undefined>;
}
export const listMedicinesRef: ListMedicinesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMedicines(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMedicinesData, undefined>;

interface ListMedicinesRef {
  ...
  (dc: DataConnect): QueryRef<ListMedicinesData, undefined>;
}
export const listMedicinesRef: ListMedicinesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMedicinesRef:
```typescript
const name = listMedicinesRef.operationName;
console.log(name);
```

### Variables
The `ListMedicines` query has no variables.
### Return Type
Recall that executing the `ListMedicines` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMedicinesData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
    imageUrl?: string | null;
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
```
### Using `ListMedicines`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMedicines } from '@firebasegen/default-connector';


// Call the `listMedicines()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMedicines();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMedicines(dataConnect);

console.log(data.medicines);

// Or, you can use the `Promise` API.
listMedicines().then((response) => {
  const data = response.data;
  console.log(data.medicines);
});
```

### Using `ListMedicines`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMedicinesRef } from '@firebasegen/default-connector';


// Call the `listMedicinesRef()` function to get a reference to the query.
const ref = listMedicinesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMedicinesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.medicines);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.medicines);
});
```

## GetMedicineBySlug
You can execute the `GetMedicineBySlug` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getMedicineBySlug(vars: GetMedicineBySlugVariables, options?: ExecuteQueryOptions): QueryPromise<GetMedicineBySlugData, GetMedicineBySlugVariables>;

interface GetMedicineBySlugRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMedicineBySlugVariables): QueryRef<GetMedicineBySlugData, GetMedicineBySlugVariables>;
}
export const getMedicineBySlugRef: GetMedicineBySlugRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMedicineBySlug(dc: DataConnect, vars: GetMedicineBySlugVariables, options?: ExecuteQueryOptions): QueryPromise<GetMedicineBySlugData, GetMedicineBySlugVariables>;

interface GetMedicineBySlugRef {
  ...
  (dc: DataConnect, vars: GetMedicineBySlugVariables): QueryRef<GetMedicineBySlugData, GetMedicineBySlugVariables>;
}
export const getMedicineBySlugRef: GetMedicineBySlugRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMedicineBySlugRef:
```typescript
const name = getMedicineBySlugRef.operationName;
console.log(name);
```

### Variables
The `GetMedicineBySlug` query requires an argument of type `GetMedicineBySlugVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetMedicineBySlugVariables {
  slug: string;
}
```
### Return Type
Recall that executing the `GetMedicineBySlug` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMedicineBySlugData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
    createdDate: string;
    imageUrl?: string | null;
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
```
### Using `GetMedicineBySlug`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMedicineBySlug, GetMedicineBySlugVariables } from '@firebasegen/default-connector';

// The `GetMedicineBySlug` query requires an argument of type `GetMedicineBySlugVariables`:
const getMedicineBySlugVars: GetMedicineBySlugVariables = {
  slug: ..., 
};

// Call the `getMedicineBySlug()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMedicineBySlug(getMedicineBySlugVars);
// Variables can be defined inline as well.
const { data } = await getMedicineBySlug({ slug: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMedicineBySlug(dataConnect, getMedicineBySlugVars);

console.log(data.medicines);

// Or, you can use the `Promise` API.
getMedicineBySlug(getMedicineBySlugVars).then((response) => {
  const data = response.data;
  console.log(data.medicines);
});
```

### Using `GetMedicineBySlug`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMedicineBySlugRef, GetMedicineBySlugVariables } from '@firebasegen/default-connector';

// The `GetMedicineBySlug` query requires an argument of type `GetMedicineBySlugVariables`:
const getMedicineBySlugVars: GetMedicineBySlugVariables = {
  slug: ..., 
};

// Call the `getMedicineBySlugRef()` function to get a reference to the query.
const ref = getMedicineBySlugRef(getMedicineBySlugVars);
// Variables can be defined inline as well.
const ref = getMedicineBySlugRef({ slug: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMedicineBySlugRef(dataConnect, getMedicineBySlugVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.medicines);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.medicines);
});
```

## ListStaffAccounts
You can execute the `ListStaffAccounts` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
listStaffAccounts(options?: ExecuteQueryOptions): QueryPromise<ListStaffAccountsData, undefined>;

interface ListStaffAccountsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListStaffAccountsData, undefined>;
}
export const listStaffAccountsRef: ListStaffAccountsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listStaffAccounts(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListStaffAccountsData, undefined>;

interface ListStaffAccountsRef {
  ...
  (dc: DataConnect): QueryRef<ListStaffAccountsData, undefined>;
}
export const listStaffAccountsRef: ListStaffAccountsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listStaffAccountsRef:
```typescript
const name = listStaffAccountsRef.operationName;
console.log(name);
```

### Variables
The `ListStaffAccounts` query has no variables.
### Return Type
Recall that executing the `ListStaffAccounts` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListStaffAccountsData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListStaffAccounts`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listStaffAccounts } from '@firebasegen/default-connector';


// Call the `listStaffAccounts()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listStaffAccounts();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listStaffAccounts(dataConnect);

console.log(data.staffAccounts);

// Or, you can use the `Promise` API.
listStaffAccounts().then((response) => {
  const data = response.data;
  console.log(data.staffAccounts);
});
```

### Using `ListStaffAccounts`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listStaffAccountsRef } from '@firebasegen/default-connector';


// Call the `listStaffAccountsRef()` function to get a reference to the query.
const ref = listStaffAccountsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listStaffAccountsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.staffAccounts);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.staffAccounts);
});
```

## GetStaffAccountByFirebaseUid
You can execute the `GetStaffAccountByFirebaseUid` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getStaffAccountByFirebaseUid(vars: GetStaffAccountByFirebaseUidVariables, options?: ExecuteQueryOptions): QueryPromise<GetStaffAccountByFirebaseUidData, GetStaffAccountByFirebaseUidVariables>;

interface GetStaffAccountByFirebaseUidRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetStaffAccountByFirebaseUidVariables): QueryRef<GetStaffAccountByFirebaseUidData, GetStaffAccountByFirebaseUidVariables>;
}
export const getStaffAccountByFirebaseUidRef: GetStaffAccountByFirebaseUidRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getStaffAccountByFirebaseUid(dc: DataConnect, vars: GetStaffAccountByFirebaseUidVariables, options?: ExecuteQueryOptions): QueryPromise<GetStaffAccountByFirebaseUidData, GetStaffAccountByFirebaseUidVariables>;

interface GetStaffAccountByFirebaseUidRef {
  ...
  (dc: DataConnect, vars: GetStaffAccountByFirebaseUidVariables): QueryRef<GetStaffAccountByFirebaseUidData, GetStaffAccountByFirebaseUidVariables>;
}
export const getStaffAccountByFirebaseUidRef: GetStaffAccountByFirebaseUidRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getStaffAccountByFirebaseUidRef:
```typescript
const name = getStaffAccountByFirebaseUidRef.operationName;
console.log(name);
```

### Variables
The `GetStaffAccountByFirebaseUid` query requires an argument of type `GetStaffAccountByFirebaseUidVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetStaffAccountByFirebaseUidVariables {
  firebaseUid: string;
}
```
### Return Type
Recall that executing the `GetStaffAccountByFirebaseUid` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetStaffAccountByFirebaseUidData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetStaffAccountByFirebaseUid`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getStaffAccountByFirebaseUid, GetStaffAccountByFirebaseUidVariables } from '@firebasegen/default-connector';

// The `GetStaffAccountByFirebaseUid` query requires an argument of type `GetStaffAccountByFirebaseUidVariables`:
const getStaffAccountByFirebaseUidVars: GetStaffAccountByFirebaseUidVariables = {
  firebaseUid: ..., 
};

// Call the `getStaffAccountByFirebaseUid()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getStaffAccountByFirebaseUid(getStaffAccountByFirebaseUidVars);
// Variables can be defined inline as well.
const { data } = await getStaffAccountByFirebaseUid({ firebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getStaffAccountByFirebaseUid(dataConnect, getStaffAccountByFirebaseUidVars);

console.log(data.staffAccounts);

// Or, you can use the `Promise` API.
getStaffAccountByFirebaseUid(getStaffAccountByFirebaseUidVars).then((response) => {
  const data = response.data;
  console.log(data.staffAccounts);
});
```

### Using `GetStaffAccountByFirebaseUid`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getStaffAccountByFirebaseUidRef, GetStaffAccountByFirebaseUidVariables } from '@firebasegen/default-connector';

// The `GetStaffAccountByFirebaseUid` query requires an argument of type `GetStaffAccountByFirebaseUidVariables`:
const getStaffAccountByFirebaseUidVars: GetStaffAccountByFirebaseUidVariables = {
  firebaseUid: ..., 
};

// Call the `getStaffAccountByFirebaseUidRef()` function to get a reference to the query.
const ref = getStaffAccountByFirebaseUidRef(getStaffAccountByFirebaseUidVars);
// Variables can be defined inline as well.
const ref = getStaffAccountByFirebaseUidRef({ firebaseUid: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getStaffAccountByFirebaseUidRef(dataConnect, getStaffAccountByFirebaseUidVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.staffAccounts);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.staffAccounts);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateMedicine
You can execute the `CreateMedicine` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createMedicine(vars: CreateMedicineVariables): MutationPromise<CreateMedicineData, CreateMedicineVariables>;

interface CreateMedicineRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMedicineVariables): MutationRef<CreateMedicineData, CreateMedicineVariables>;
}
export const createMedicineRef: CreateMedicineRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createMedicine(dc: DataConnect, vars: CreateMedicineVariables): MutationPromise<CreateMedicineData, CreateMedicineVariables>;

interface CreateMedicineRef {
  ...
  (dc: DataConnect, vars: CreateMedicineVariables): MutationRef<CreateMedicineData, CreateMedicineVariables>;
}
export const createMedicineRef: CreateMedicineRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createMedicineRef:
```typescript
const name = createMedicineRef.operationName;
console.log(name);
```

### Variables
The `CreateMedicine` mutation requires an argument of type `CreateMedicineVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
  imageUrl?: string | null;
}
```
### Return Type
Recall that executing the `CreateMedicine` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateMedicineData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateMedicineData {
  medicine_insert: Medicine_Key;
}
```
### Using `CreateMedicine`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createMedicine, CreateMedicineVariables } from '@firebasegen/default-connector';

// The `CreateMedicine` mutation requires an argument of type `CreateMedicineVariables`:
const createMedicineVars: CreateMedicineVariables = {
  slug: ..., 
  genericName: ..., 
  chemicalName: ..., 
  category: ..., 
  strength: ..., 
  ageGroup: ..., 
  prescriptionRequired: ..., 
  verified: ..., 
  maxDailyDoseAdults: ..., 
  safetyPregnancy: ..., 
  safetyBreastfeeding: ..., 
  safetyElderly: ..., 
  safetyChildren: ..., 
  brandNames: ..., 
  form: ..., 
  createdDate: ..., 
  imageUrl: ..., // optional
};

// Call the `createMedicine()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createMedicine(createMedicineVars);
// Variables can be defined inline as well.
const { data } = await createMedicine({ slug: ..., genericName: ..., chemicalName: ..., category: ..., strength: ..., ageGroup: ..., prescriptionRequired: ..., verified: ..., maxDailyDoseAdults: ..., safetyPregnancy: ..., safetyBreastfeeding: ..., safetyElderly: ..., safetyChildren: ..., brandNames: ..., form: ..., createdDate: ..., imageUrl: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createMedicine(dataConnect, createMedicineVars);

console.log(data.medicine_insert);

// Or, you can use the `Promise` API.
createMedicine(createMedicineVars).then((response) => {
  const data = response.data;
  console.log(data.medicine_insert);
});
```

### Using `CreateMedicine`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createMedicineRef, CreateMedicineVariables } from '@firebasegen/default-connector';

// The `CreateMedicine` mutation requires an argument of type `CreateMedicineVariables`:
const createMedicineVars: CreateMedicineVariables = {
  slug: ..., 
  genericName: ..., 
  chemicalName: ..., 
  category: ..., 
  strength: ..., 
  ageGroup: ..., 
  prescriptionRequired: ..., 
  verified: ..., 
  maxDailyDoseAdults: ..., 
  safetyPregnancy: ..., 
  safetyBreastfeeding: ..., 
  safetyElderly: ..., 
  safetyChildren: ..., 
  brandNames: ..., 
  form: ..., 
  createdDate: ..., 
  imageUrl: ..., // optional
};

// Call the `createMedicineRef()` function to get a reference to the mutation.
const ref = createMedicineRef(createMedicineVars);
// Variables can be defined inline as well.
const ref = createMedicineRef({ slug: ..., genericName: ..., chemicalName: ..., category: ..., strength: ..., ageGroup: ..., prescriptionRequired: ..., verified: ..., maxDailyDoseAdults: ..., safetyPregnancy: ..., safetyBreastfeeding: ..., safetyElderly: ..., safetyChildren: ..., brandNames: ..., form: ..., createdDate: ..., imageUrl: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createMedicineRef(dataConnect, createMedicineVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.medicine_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.medicine_insert);
});
```

## CreateMedicineLocalizedContent
You can execute the `CreateMedicineLocalizedContent` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createMedicineLocalizedContent(vars: CreateMedicineLocalizedContentVariables): MutationPromise<CreateMedicineLocalizedContentData, CreateMedicineLocalizedContentVariables>;

interface CreateMedicineLocalizedContentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMedicineLocalizedContentVariables): MutationRef<CreateMedicineLocalizedContentData, CreateMedicineLocalizedContentVariables>;
}
export const createMedicineLocalizedContentRef: CreateMedicineLocalizedContentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createMedicineLocalizedContent(dc: DataConnect, vars: CreateMedicineLocalizedContentVariables): MutationPromise<CreateMedicineLocalizedContentData, CreateMedicineLocalizedContentVariables>;

interface CreateMedicineLocalizedContentRef {
  ...
  (dc: DataConnect, vars: CreateMedicineLocalizedContentVariables): MutationRef<CreateMedicineLocalizedContentData, CreateMedicineLocalizedContentVariables>;
}
export const createMedicineLocalizedContentRef: CreateMedicineLocalizedContentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createMedicineLocalizedContentRef:
```typescript
const name = createMedicineLocalizedContentRef.operationName;
console.log(name);
```

### Variables
The `CreateMedicineLocalizedContent` mutation requires an argument of type `CreateMedicineLocalizedContentVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `CreateMedicineLocalizedContent` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateMedicineLocalizedContentData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateMedicineLocalizedContentData {
  medicineLocalizedContent_insert: MedicineLocalizedContent_Key;
}
```
### Using `CreateMedicineLocalizedContent`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createMedicineLocalizedContent, CreateMedicineLocalizedContentVariables } from '@firebasegen/default-connector';

// The `CreateMedicineLocalizedContent` mutation requires an argument of type `CreateMedicineLocalizedContentVariables`:
const createMedicineLocalizedContentVars: CreateMedicineLocalizedContentVariables = {
  medicineId: ..., 
  language: ..., 
  description: ..., 
  howItWorks: ..., 
  dosageNotes: ..., 
  usedFor: ..., 
  sideEffectsCommon: ..., 
  sideEffectsLessCommon: ..., 
  sideEffectsSerious: ..., 
};

// Call the `createMedicineLocalizedContent()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createMedicineLocalizedContent(createMedicineLocalizedContentVars);
// Variables can be defined inline as well.
const { data } = await createMedicineLocalizedContent({ medicineId: ..., language: ..., description: ..., howItWorks: ..., dosageNotes: ..., usedFor: ..., sideEffectsCommon: ..., sideEffectsLessCommon: ..., sideEffectsSerious: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createMedicineLocalizedContent(dataConnect, createMedicineLocalizedContentVars);

console.log(data.medicineLocalizedContent_insert);

// Or, you can use the `Promise` API.
createMedicineLocalizedContent(createMedicineLocalizedContentVars).then((response) => {
  const data = response.data;
  console.log(data.medicineLocalizedContent_insert);
});
```

### Using `CreateMedicineLocalizedContent`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createMedicineLocalizedContentRef, CreateMedicineLocalizedContentVariables } from '@firebasegen/default-connector';

// The `CreateMedicineLocalizedContent` mutation requires an argument of type `CreateMedicineLocalizedContentVariables`:
const createMedicineLocalizedContentVars: CreateMedicineLocalizedContentVariables = {
  medicineId: ..., 
  language: ..., 
  description: ..., 
  howItWorks: ..., 
  dosageNotes: ..., 
  usedFor: ..., 
  sideEffectsCommon: ..., 
  sideEffectsLessCommon: ..., 
  sideEffectsSerious: ..., 
};

// Call the `createMedicineLocalizedContentRef()` function to get a reference to the mutation.
const ref = createMedicineLocalizedContentRef(createMedicineLocalizedContentVars);
// Variables can be defined inline as well.
const ref = createMedicineLocalizedContentRef({ medicineId: ..., language: ..., description: ..., howItWorks: ..., dosageNotes: ..., usedFor: ..., sideEffectsCommon: ..., sideEffectsLessCommon: ..., sideEffectsSerious: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createMedicineLocalizedContentRef(dataConnect, createMedicineLocalizedContentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.medicineLocalizedContent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.medicineLocalizedContent_insert);
});
```

## CreateDosageRow
You can execute the `CreateDosageRow` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createDosageRow(vars: CreateDosageRowVariables): MutationPromise<CreateDosageRowData, CreateDosageRowVariables>;

interface CreateDosageRowRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateDosageRowVariables): MutationRef<CreateDosageRowData, CreateDosageRowVariables>;
}
export const createDosageRowRef: CreateDosageRowRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createDosageRow(dc: DataConnect, vars: CreateDosageRowVariables): MutationPromise<CreateDosageRowData, CreateDosageRowVariables>;

interface CreateDosageRowRef {
  ...
  (dc: DataConnect, vars: CreateDosageRowVariables): MutationRef<CreateDosageRowData, CreateDosageRowVariables>;
}
export const createDosageRowRef: CreateDosageRowRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createDosageRowRef:
```typescript
const name = createDosageRowRef.operationName;
console.log(name);
```

### Variables
The `CreateDosageRow` mutation requires an argument of type `CreateDosageRowVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateDosageRowVariables {
  medicineId: UUIDString;
  ageGroup: string;
  dose: string;
  frequency: string;
  maxPerDay: string;
}
```
### Return Type
Recall that executing the `CreateDosageRow` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateDosageRowData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateDosageRowData {
  dosageRow_insert: DosageRow_Key;
}
```
### Using `CreateDosageRow`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createDosageRow, CreateDosageRowVariables } from '@firebasegen/default-connector';

// The `CreateDosageRow` mutation requires an argument of type `CreateDosageRowVariables`:
const createDosageRowVars: CreateDosageRowVariables = {
  medicineId: ..., 
  ageGroup: ..., 
  dose: ..., 
  frequency: ..., 
  maxPerDay: ..., 
};

// Call the `createDosageRow()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createDosageRow(createDosageRowVars);
// Variables can be defined inline as well.
const { data } = await createDosageRow({ medicineId: ..., ageGroup: ..., dose: ..., frequency: ..., maxPerDay: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createDosageRow(dataConnect, createDosageRowVars);

console.log(data.dosageRow_insert);

// Or, you can use the `Promise` API.
createDosageRow(createDosageRowVars).then((response) => {
  const data = response.data;
  console.log(data.dosageRow_insert);
});
```

### Using `CreateDosageRow`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createDosageRowRef, CreateDosageRowVariables } from '@firebasegen/default-connector';

// The `CreateDosageRow` mutation requires an argument of type `CreateDosageRowVariables`:
const createDosageRowVars: CreateDosageRowVariables = {
  medicineId: ..., 
  ageGroup: ..., 
  dose: ..., 
  frequency: ..., 
  maxPerDay: ..., 
};

// Call the `createDosageRowRef()` function to get a reference to the mutation.
const ref = createDosageRowRef(createDosageRowVars);
// Variables can be defined inline as well.
const ref = createDosageRowRef({ medicineId: ..., ageGroup: ..., dose: ..., frequency: ..., maxPerDay: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createDosageRowRef(dataConnect, createDosageRowVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.dosageRow_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.dosageRow_insert);
});
```

## CreateDrugInteraction
You can execute the `CreateDrugInteraction` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createDrugInteraction(vars: CreateDrugInteractionVariables): MutationPromise<CreateDrugInteractionData, CreateDrugInteractionVariables>;

interface CreateDrugInteractionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateDrugInteractionVariables): MutationRef<CreateDrugInteractionData, CreateDrugInteractionVariables>;
}
export const createDrugInteractionRef: CreateDrugInteractionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createDrugInteraction(dc: DataConnect, vars: CreateDrugInteractionVariables): MutationPromise<CreateDrugInteractionData, CreateDrugInteractionVariables>;

interface CreateDrugInteractionRef {
  ...
  (dc: DataConnect, vars: CreateDrugInteractionVariables): MutationRef<CreateDrugInteractionData, CreateDrugInteractionVariables>;
}
export const createDrugInteractionRef: CreateDrugInteractionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createDrugInteractionRef:
```typescript
const name = createDrugInteractionRef.operationName;
console.log(name);
```

### Variables
The `CreateDrugInteraction` mutation requires an argument of type `CreateDrugInteractionVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateDrugInteractionVariables {
  medicineId: UUIDString;
  drug: string;
  note: string;
}
```
### Return Type
Recall that executing the `CreateDrugInteraction` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateDrugInteractionData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateDrugInteractionData {
  drugInteraction_insert: DrugInteraction_Key;
}
```
### Using `CreateDrugInteraction`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createDrugInteraction, CreateDrugInteractionVariables } from '@firebasegen/default-connector';

// The `CreateDrugInteraction` mutation requires an argument of type `CreateDrugInteractionVariables`:
const createDrugInteractionVars: CreateDrugInteractionVariables = {
  medicineId: ..., 
  drug: ..., 
  note: ..., 
};

// Call the `createDrugInteraction()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createDrugInteraction(createDrugInteractionVars);
// Variables can be defined inline as well.
const { data } = await createDrugInteraction({ medicineId: ..., drug: ..., note: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createDrugInteraction(dataConnect, createDrugInteractionVars);

console.log(data.drugInteraction_insert);

// Or, you can use the `Promise` API.
createDrugInteraction(createDrugInteractionVars).then((response) => {
  const data = response.data;
  console.log(data.drugInteraction_insert);
});
```

### Using `CreateDrugInteraction`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createDrugInteractionRef, CreateDrugInteractionVariables } from '@firebasegen/default-connector';

// The `CreateDrugInteraction` mutation requires an argument of type `CreateDrugInteractionVariables`:
const createDrugInteractionVars: CreateDrugInteractionVariables = {
  medicineId: ..., 
  drug: ..., 
  note: ..., 
};

// Call the `createDrugInteractionRef()` function to get a reference to the mutation.
const ref = createDrugInteractionRef(createDrugInteractionVars);
// Variables can be defined inline as well.
const ref = createDrugInteractionRef({ medicineId: ..., drug: ..., note: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createDrugInteractionRef(dataConnect, createDrugInteractionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.drugInteraction_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.drugInteraction_insert);
});
```

## CreateWarningCard
You can execute the `CreateWarningCard` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createWarningCard(vars: CreateWarningCardVariables): MutationPromise<CreateWarningCardData, CreateWarningCardVariables>;

interface CreateWarningCardRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateWarningCardVariables): MutationRef<CreateWarningCardData, CreateWarningCardVariables>;
}
export const createWarningCardRef: CreateWarningCardRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createWarningCard(dc: DataConnect, vars: CreateWarningCardVariables): MutationPromise<CreateWarningCardData, CreateWarningCardVariables>;

interface CreateWarningCardRef {
  ...
  (dc: DataConnect, vars: CreateWarningCardVariables): MutationRef<CreateWarningCardData, CreateWarningCardVariables>;
}
export const createWarningCardRef: CreateWarningCardRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createWarningCardRef:
```typescript
const name = createWarningCardRef.operationName;
console.log(name);
```

### Variables
The `CreateWarningCard` mutation requires an argument of type `CreateWarningCardVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateWarningCardVariables {
  localizedContentId: UUIDString;
  title: string;
  severity: string;
  text: string;
}
```
### Return Type
Recall that executing the `CreateWarningCard` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateWarningCardData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateWarningCardData {
  warningCard_insert: WarningCard_Key;
}
```
### Using `CreateWarningCard`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createWarningCard, CreateWarningCardVariables } from '@firebasegen/default-connector';

// The `CreateWarningCard` mutation requires an argument of type `CreateWarningCardVariables`:
const createWarningCardVars: CreateWarningCardVariables = {
  localizedContentId: ..., 
  title: ..., 
  severity: ..., 
  text: ..., 
};

// Call the `createWarningCard()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createWarningCard(createWarningCardVars);
// Variables can be defined inline as well.
const { data } = await createWarningCard({ localizedContentId: ..., title: ..., severity: ..., text: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createWarningCard(dataConnect, createWarningCardVars);

console.log(data.warningCard_insert);

// Or, you can use the `Promise` API.
createWarningCard(createWarningCardVars).then((response) => {
  const data = response.data;
  console.log(data.warningCard_insert);
});
```

### Using `CreateWarningCard`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createWarningCardRef, CreateWarningCardVariables } from '@firebasegen/default-connector';

// The `CreateWarningCard` mutation requires an argument of type `CreateWarningCardVariables`:
const createWarningCardVars: CreateWarningCardVariables = {
  localizedContentId: ..., 
  title: ..., 
  severity: ..., 
  text: ..., 
};

// Call the `createWarningCardRef()` function to get a reference to the mutation.
const ref = createWarningCardRef(createWarningCardVars);
// Variables can be defined inline as well.
const ref = createWarningCardRef({ localizedContentId: ..., title: ..., severity: ..., text: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createWarningCardRef(dataConnect, createWarningCardVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.warningCard_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.warningCard_insert);
});
```

## DeleteMedicineRelations
You can execute the `DeleteMedicineRelations` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
deleteMedicineRelations(vars: DeleteMedicineRelationsVariables): MutationPromise<DeleteMedicineRelationsData, DeleteMedicineRelationsVariables>;

interface DeleteMedicineRelationsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteMedicineRelationsVariables): MutationRef<DeleteMedicineRelationsData, DeleteMedicineRelationsVariables>;
}
export const deleteMedicineRelationsRef: DeleteMedicineRelationsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteMedicineRelations(dc: DataConnect, vars: DeleteMedicineRelationsVariables): MutationPromise<DeleteMedicineRelationsData, DeleteMedicineRelationsVariables>;

interface DeleteMedicineRelationsRef {
  ...
  (dc: DataConnect, vars: DeleteMedicineRelationsVariables): MutationRef<DeleteMedicineRelationsData, DeleteMedicineRelationsVariables>;
}
export const deleteMedicineRelationsRef: DeleteMedicineRelationsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteMedicineRelationsRef:
```typescript
const name = deleteMedicineRelationsRef.operationName;
console.log(name);
```

### Variables
The `DeleteMedicineRelations` mutation requires an argument of type `DeleteMedicineRelationsVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteMedicineRelationsVariables {
  medicineId: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteMedicineRelations` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteMedicineRelationsData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteMedicineRelationsData {
  dosageRow_deleteMany: number;
  drugInteraction_deleteMany: number;
  medicineLocalizedContent_deleteMany: number;
}
```
### Using `DeleteMedicineRelations`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteMedicineRelations, DeleteMedicineRelationsVariables } from '@firebasegen/default-connector';

// The `DeleteMedicineRelations` mutation requires an argument of type `DeleteMedicineRelationsVariables`:
const deleteMedicineRelationsVars: DeleteMedicineRelationsVariables = {
  medicineId: ..., 
};

// Call the `deleteMedicineRelations()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteMedicineRelations(deleteMedicineRelationsVars);
// Variables can be defined inline as well.
const { data } = await deleteMedicineRelations({ medicineId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteMedicineRelations(dataConnect, deleteMedicineRelationsVars);

console.log(data.dosageRow_deleteMany);
console.log(data.drugInteraction_deleteMany);
console.log(data.medicineLocalizedContent_deleteMany);

// Or, you can use the `Promise` API.
deleteMedicineRelations(deleteMedicineRelationsVars).then((response) => {
  const data = response.data;
  console.log(data.dosageRow_deleteMany);
  console.log(data.drugInteraction_deleteMany);
  console.log(data.medicineLocalizedContent_deleteMany);
});
```

### Using `DeleteMedicineRelations`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteMedicineRelationsRef, DeleteMedicineRelationsVariables } from '@firebasegen/default-connector';

// The `DeleteMedicineRelations` mutation requires an argument of type `DeleteMedicineRelationsVariables`:
const deleteMedicineRelationsVars: DeleteMedicineRelationsVariables = {
  medicineId: ..., 
};

// Call the `deleteMedicineRelationsRef()` function to get a reference to the mutation.
const ref = deleteMedicineRelationsRef(deleteMedicineRelationsVars);
// Variables can be defined inline as well.
const ref = deleteMedicineRelationsRef({ medicineId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteMedicineRelationsRef(dataConnect, deleteMedicineRelationsVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.dosageRow_deleteMany);
console.log(data.drugInteraction_deleteMany);
console.log(data.medicineLocalizedContent_deleteMany);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.dosageRow_deleteMany);
  console.log(data.drugInteraction_deleteMany);
  console.log(data.medicineLocalizedContent_deleteMany);
});
```

## UpdateMedicineCore
You can execute the `UpdateMedicineCore` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
updateMedicineCore(vars: UpdateMedicineCoreVariables): MutationPromise<UpdateMedicineCoreData, UpdateMedicineCoreVariables>;

interface UpdateMedicineCoreRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateMedicineCoreVariables): MutationRef<UpdateMedicineCoreData, UpdateMedicineCoreVariables>;
}
export const updateMedicineCoreRef: UpdateMedicineCoreRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateMedicineCore(dc: DataConnect, vars: UpdateMedicineCoreVariables): MutationPromise<UpdateMedicineCoreData, UpdateMedicineCoreVariables>;

interface UpdateMedicineCoreRef {
  ...
  (dc: DataConnect, vars: UpdateMedicineCoreVariables): MutationRef<UpdateMedicineCoreData, UpdateMedicineCoreVariables>;
}
export const updateMedicineCoreRef: UpdateMedicineCoreRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateMedicineCoreRef:
```typescript
const name = updateMedicineCoreRef.operationName;
console.log(name);
```

### Variables
The `UpdateMedicineCore` mutation requires an argument of type `UpdateMedicineCoreVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
  imageUrl?: string | null;
}
```
### Return Type
Recall that executing the `UpdateMedicineCore` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateMedicineCoreData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateMedicineCoreData {
  medicine_update?: Medicine_Key | null;
}
```
### Using `UpdateMedicineCore`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateMedicineCore, UpdateMedicineCoreVariables } from '@firebasegen/default-connector';

// The `UpdateMedicineCore` mutation requires an argument of type `UpdateMedicineCoreVariables`:
const updateMedicineCoreVars: UpdateMedicineCoreVariables = {
  id: ..., 
  slug: ..., 
  genericName: ..., 
  chemicalName: ..., 
  category: ..., 
  strength: ..., 
  ageGroup: ..., 
  prescriptionRequired: ..., 
  verified: ..., 
  maxDailyDoseAdults: ..., 
  safetyPregnancy: ..., 
  safetyBreastfeeding: ..., 
  safetyElderly: ..., 
  safetyChildren: ..., 
  brandNames: ..., 
  form: ..., 
  createdDate: ..., 
  imageUrl: ..., // optional
};

// Call the `updateMedicineCore()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateMedicineCore(updateMedicineCoreVars);
// Variables can be defined inline as well.
const { data } = await updateMedicineCore({ id: ..., slug: ..., genericName: ..., chemicalName: ..., category: ..., strength: ..., ageGroup: ..., prescriptionRequired: ..., verified: ..., maxDailyDoseAdults: ..., safetyPregnancy: ..., safetyBreastfeeding: ..., safetyElderly: ..., safetyChildren: ..., brandNames: ..., form: ..., createdDate: ..., imageUrl: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateMedicineCore(dataConnect, updateMedicineCoreVars);

console.log(data.medicine_update);

// Or, you can use the `Promise` API.
updateMedicineCore(updateMedicineCoreVars).then((response) => {
  const data = response.data;
  console.log(data.medicine_update);
});
```

### Using `UpdateMedicineCore`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateMedicineCoreRef, UpdateMedicineCoreVariables } from '@firebasegen/default-connector';

// The `UpdateMedicineCore` mutation requires an argument of type `UpdateMedicineCoreVariables`:
const updateMedicineCoreVars: UpdateMedicineCoreVariables = {
  id: ..., 
  slug: ..., 
  genericName: ..., 
  chemicalName: ..., 
  category: ..., 
  strength: ..., 
  ageGroup: ..., 
  prescriptionRequired: ..., 
  verified: ..., 
  maxDailyDoseAdults: ..., 
  safetyPregnancy: ..., 
  safetyBreastfeeding: ..., 
  safetyElderly: ..., 
  safetyChildren: ..., 
  brandNames: ..., 
  form: ..., 
  createdDate: ..., 
  imageUrl: ..., // optional
};

// Call the `updateMedicineCoreRef()` function to get a reference to the mutation.
const ref = updateMedicineCoreRef(updateMedicineCoreVars);
// Variables can be defined inline as well.
const ref = updateMedicineCoreRef({ id: ..., slug: ..., genericName: ..., chemicalName: ..., category: ..., strength: ..., ageGroup: ..., prescriptionRequired: ..., verified: ..., maxDailyDoseAdults: ..., safetyPregnancy: ..., safetyBreastfeeding: ..., safetyElderly: ..., safetyChildren: ..., brandNames: ..., form: ..., createdDate: ..., imageUrl: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateMedicineCoreRef(dataConnect, updateMedicineCoreVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.medicine_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.medicine_update);
});
```

## CreateMedicineVerification
You can execute the `CreateMedicineVerification` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createMedicineVerification(vars: CreateMedicineVerificationVariables): MutationPromise<CreateMedicineVerificationData, CreateMedicineVerificationVariables>;

interface CreateMedicineVerificationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMedicineVerificationVariables): MutationRef<CreateMedicineVerificationData, CreateMedicineVerificationVariables>;
}
export const createMedicineVerificationRef: CreateMedicineVerificationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createMedicineVerification(dc: DataConnect, vars: CreateMedicineVerificationVariables): MutationPromise<CreateMedicineVerificationData, CreateMedicineVerificationVariables>;

interface CreateMedicineVerificationRef {
  ...
  (dc: DataConnect, vars: CreateMedicineVerificationVariables): MutationRef<CreateMedicineVerificationData, CreateMedicineVerificationVariables>;
}
export const createMedicineVerificationRef: CreateMedicineVerificationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createMedicineVerificationRef:
```typescript
const name = createMedicineVerificationRef.operationName;
console.log(name);
```

### Variables
The `CreateMedicineVerification` mutation requires an argument of type `CreateMedicineVerificationVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateMedicineVerificationVariables {
  medicineId: UUIDString;
  doctorId: string;
  slmcRegNo: string;
  verifiedAt: string;
}
```
### Return Type
Recall that executing the `CreateMedicineVerification` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateMedicineVerificationData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateMedicineVerificationData {
  medicineVerification_insert: MedicineVerification_Key;
}
```
### Using `CreateMedicineVerification`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createMedicineVerification, CreateMedicineVerificationVariables } from '@firebasegen/default-connector';

// The `CreateMedicineVerification` mutation requires an argument of type `CreateMedicineVerificationVariables`:
const createMedicineVerificationVars: CreateMedicineVerificationVariables = {
  medicineId: ..., 
  doctorId: ..., 
  slmcRegNo: ..., 
  verifiedAt: ..., 
};

// Call the `createMedicineVerification()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createMedicineVerification(createMedicineVerificationVars);
// Variables can be defined inline as well.
const { data } = await createMedicineVerification({ medicineId: ..., doctorId: ..., slmcRegNo: ..., verifiedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createMedicineVerification(dataConnect, createMedicineVerificationVars);

console.log(data.medicineVerification_insert);

// Or, you can use the `Promise` API.
createMedicineVerification(createMedicineVerificationVars).then((response) => {
  const data = response.data;
  console.log(data.medicineVerification_insert);
});
```

### Using `CreateMedicineVerification`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createMedicineVerificationRef, CreateMedicineVerificationVariables } from '@firebasegen/default-connector';

// The `CreateMedicineVerification` mutation requires an argument of type `CreateMedicineVerificationVariables`:
const createMedicineVerificationVars: CreateMedicineVerificationVariables = {
  medicineId: ..., 
  doctorId: ..., 
  slmcRegNo: ..., 
  verifiedAt: ..., 
};

// Call the `createMedicineVerificationRef()` function to get a reference to the mutation.
const ref = createMedicineVerificationRef(createMedicineVerificationVars);
// Variables can be defined inline as well.
const ref = createMedicineVerificationRef({ medicineId: ..., doctorId: ..., slmcRegNo: ..., verifiedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createMedicineVerificationRef(dataConnect, createMedicineVerificationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.medicineVerification_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.medicineVerification_insert);
});
```

## SetMedicineVerified
You can execute the `SetMedicineVerified` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
setMedicineVerified(vars: SetMedicineVerifiedVariables): MutationPromise<SetMedicineVerifiedData, SetMedicineVerifiedVariables>;

interface SetMedicineVerifiedRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SetMedicineVerifiedVariables): MutationRef<SetMedicineVerifiedData, SetMedicineVerifiedVariables>;
}
export const setMedicineVerifiedRef: SetMedicineVerifiedRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
setMedicineVerified(dc: DataConnect, vars: SetMedicineVerifiedVariables): MutationPromise<SetMedicineVerifiedData, SetMedicineVerifiedVariables>;

interface SetMedicineVerifiedRef {
  ...
  (dc: DataConnect, vars: SetMedicineVerifiedVariables): MutationRef<SetMedicineVerifiedData, SetMedicineVerifiedVariables>;
}
export const setMedicineVerifiedRef: SetMedicineVerifiedRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the setMedicineVerifiedRef:
```typescript
const name = setMedicineVerifiedRef.operationName;
console.log(name);
```

### Variables
The `SetMedicineVerified` mutation requires an argument of type `SetMedicineVerifiedVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SetMedicineVerifiedVariables {
  id: UUIDString;
  verified: boolean;
}
```
### Return Type
Recall that executing the `SetMedicineVerified` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SetMedicineVerifiedData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SetMedicineVerifiedData {
  medicine_update?: Medicine_Key | null;
}
```
### Using `SetMedicineVerified`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, setMedicineVerified, SetMedicineVerifiedVariables } from '@firebasegen/default-connector';

// The `SetMedicineVerified` mutation requires an argument of type `SetMedicineVerifiedVariables`:
const setMedicineVerifiedVars: SetMedicineVerifiedVariables = {
  id: ..., 
  verified: ..., 
};

// Call the `setMedicineVerified()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await setMedicineVerified(setMedicineVerifiedVars);
// Variables can be defined inline as well.
const { data } = await setMedicineVerified({ id: ..., verified: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await setMedicineVerified(dataConnect, setMedicineVerifiedVars);

console.log(data.medicine_update);

// Or, you can use the `Promise` API.
setMedicineVerified(setMedicineVerifiedVars).then((response) => {
  const data = response.data;
  console.log(data.medicine_update);
});
```

### Using `SetMedicineVerified`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, setMedicineVerifiedRef, SetMedicineVerifiedVariables } from '@firebasegen/default-connector';

// The `SetMedicineVerified` mutation requires an argument of type `SetMedicineVerifiedVariables`:
const setMedicineVerifiedVars: SetMedicineVerifiedVariables = {
  id: ..., 
  verified: ..., 
};

// Call the `setMedicineVerifiedRef()` function to get a reference to the mutation.
const ref = setMedicineVerifiedRef(setMedicineVerifiedVars);
// Variables can be defined inline as well.
const ref = setMedicineVerifiedRef({ id: ..., verified: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = setMedicineVerifiedRef(dataConnect, setMedicineVerifiedVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.medicine_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.medicine_update);
});
```

## CreateStaffAccount
You can execute the `CreateStaffAccount` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createStaffAccount(vars: CreateStaffAccountVariables): MutationPromise<CreateStaffAccountData, CreateStaffAccountVariables>;

interface CreateStaffAccountRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateStaffAccountVariables): MutationRef<CreateStaffAccountData, CreateStaffAccountVariables>;
}
export const createStaffAccountRef: CreateStaffAccountRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createStaffAccount(dc: DataConnect, vars: CreateStaffAccountVariables): MutationPromise<CreateStaffAccountData, CreateStaffAccountVariables>;

interface CreateStaffAccountRef {
  ...
  (dc: DataConnect, vars: CreateStaffAccountVariables): MutationRef<CreateStaffAccountData, CreateStaffAccountVariables>;
}
export const createStaffAccountRef: CreateStaffAccountRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createStaffAccountRef:
```typescript
const name = createStaffAccountRef.operationName;
console.log(name);
```

### Variables
The `CreateStaffAccount` mutation requires an argument of type `CreateStaffAccountVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `CreateStaffAccount` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateStaffAccountData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateStaffAccountData {
  staffAccount_insert: StaffAccount_Key;
}
```
### Using `CreateStaffAccount`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createStaffAccount, CreateStaffAccountVariables } from '@firebasegen/default-connector';

// The `CreateStaffAccount` mutation requires an argument of type `CreateStaffAccountVariables`:
const createStaffAccountVars: CreateStaffAccountVariables = {
  firebaseUid: ..., 
  email: ..., 
  name: ..., 
  profession: ..., 
  slmcRegNo: ..., 
  proofUrl: ..., 
  status: ..., 
  hospital: ..., // optional
  specialization: ..., // optional
  createdAt: ..., 
};

// Call the `createStaffAccount()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createStaffAccount(createStaffAccountVars);
// Variables can be defined inline as well.
const { data } = await createStaffAccount({ firebaseUid: ..., email: ..., name: ..., profession: ..., slmcRegNo: ..., proofUrl: ..., status: ..., hospital: ..., specialization: ..., createdAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createStaffAccount(dataConnect, createStaffAccountVars);

console.log(data.staffAccount_insert);

// Or, you can use the `Promise` API.
createStaffAccount(createStaffAccountVars).then((response) => {
  const data = response.data;
  console.log(data.staffAccount_insert);
});
```

### Using `CreateStaffAccount`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createStaffAccountRef, CreateStaffAccountVariables } from '@firebasegen/default-connector';

// The `CreateStaffAccount` mutation requires an argument of type `CreateStaffAccountVariables`:
const createStaffAccountVars: CreateStaffAccountVariables = {
  firebaseUid: ..., 
  email: ..., 
  name: ..., 
  profession: ..., 
  slmcRegNo: ..., 
  proofUrl: ..., 
  status: ..., 
  hospital: ..., // optional
  specialization: ..., // optional
  createdAt: ..., 
};

// Call the `createStaffAccountRef()` function to get a reference to the mutation.
const ref = createStaffAccountRef(createStaffAccountVars);
// Variables can be defined inline as well.
const ref = createStaffAccountRef({ firebaseUid: ..., email: ..., name: ..., profession: ..., slmcRegNo: ..., proofUrl: ..., status: ..., hospital: ..., specialization: ..., createdAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createStaffAccountRef(dataConnect, createStaffAccountVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.staffAccount_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.staffAccount_insert);
});
```

## UpdateStaffStatus
You can execute the `UpdateStaffStatus` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
updateStaffStatus(vars: UpdateStaffStatusVariables): MutationPromise<UpdateStaffStatusData, UpdateStaffStatusVariables>;

interface UpdateStaffStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateStaffStatusVariables): MutationRef<UpdateStaffStatusData, UpdateStaffStatusVariables>;
}
export const updateStaffStatusRef: UpdateStaffStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateStaffStatus(dc: DataConnect, vars: UpdateStaffStatusVariables): MutationPromise<UpdateStaffStatusData, UpdateStaffStatusVariables>;

interface UpdateStaffStatusRef {
  ...
  (dc: DataConnect, vars: UpdateStaffStatusVariables): MutationRef<UpdateStaffStatusData, UpdateStaffStatusVariables>;
}
export const updateStaffStatusRef: UpdateStaffStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateStaffStatusRef:
```typescript
const name = updateStaffStatusRef.operationName;
console.log(name);
```

### Variables
The `UpdateStaffStatus` mutation requires an argument of type `UpdateStaffStatusVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateStaffStatusVariables {
  id: UUIDString;
  status: string;
}
```
### Return Type
Recall that executing the `UpdateStaffStatus` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateStaffStatusData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateStaffStatusData {
  staffAccount_update?: StaffAccount_Key | null;
}
```
### Using `UpdateStaffStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateStaffStatus, UpdateStaffStatusVariables } from '@firebasegen/default-connector';

// The `UpdateStaffStatus` mutation requires an argument of type `UpdateStaffStatusVariables`:
const updateStaffStatusVars: UpdateStaffStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateStaffStatus()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateStaffStatus(updateStaffStatusVars);
// Variables can be defined inline as well.
const { data } = await updateStaffStatus({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateStaffStatus(dataConnect, updateStaffStatusVars);

console.log(data.staffAccount_update);

// Or, you can use the `Promise` API.
updateStaffStatus(updateStaffStatusVars).then((response) => {
  const data = response.data;
  console.log(data.staffAccount_update);
});
```

### Using `UpdateStaffStatus`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateStaffStatusRef, UpdateStaffStatusVariables } from '@firebasegen/default-connector';

// The `UpdateStaffStatus` mutation requires an argument of type `UpdateStaffStatusVariables`:
const updateStaffStatusVars: UpdateStaffStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateStaffStatusRef()` function to get a reference to the mutation.
const ref = updateStaffStatusRef(updateStaffStatusVars);
// Variables can be defined inline as well.
const ref = updateStaffStatusRef({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateStaffStatusRef(dataConnect, updateStaffStatusVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.staffAccount_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.staffAccount_update);
});
```

