const { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'mediinfo-lk-service',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createMedicineRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateMedicine', inputVars);
}
createMedicineRef.operationName = 'CreateMedicine';
exports.createMedicineRef = createMedicineRef;

exports.createMedicine = function createMedicine(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createMedicineRef(dcInstance, inputVars));
}
;

const createMedicineLocalizedContentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateMedicineLocalizedContent', inputVars);
}
createMedicineLocalizedContentRef.operationName = 'CreateMedicineLocalizedContent';
exports.createMedicineLocalizedContentRef = createMedicineLocalizedContentRef;

exports.createMedicineLocalizedContent = function createMedicineLocalizedContent(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createMedicineLocalizedContentRef(dcInstance, inputVars));
}
;

const createDosageRowRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateDosageRow', inputVars);
}
createDosageRowRef.operationName = 'CreateDosageRow';
exports.createDosageRowRef = createDosageRowRef;

exports.createDosageRow = function createDosageRow(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createDosageRowRef(dcInstance, inputVars));
}
;

const createDrugInteractionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateDrugInteraction', inputVars);
}
createDrugInteractionRef.operationName = 'CreateDrugInteraction';
exports.createDrugInteractionRef = createDrugInteractionRef;

exports.createDrugInteraction = function createDrugInteraction(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createDrugInteractionRef(dcInstance, inputVars));
}
;

const createWarningCardRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateWarningCard', inputVars);
}
createWarningCardRef.operationName = 'CreateWarningCard';
exports.createWarningCardRef = createWarningCardRef;

exports.createWarningCard = function createWarningCard(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createWarningCardRef(dcInstance, inputVars));
}
;

const deleteMedicineRelationsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteMedicineRelations', inputVars);
}
deleteMedicineRelationsRef.operationName = 'DeleteMedicineRelations';
exports.deleteMedicineRelationsRef = deleteMedicineRelationsRef;

exports.deleteMedicineRelations = function deleteMedicineRelations(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteMedicineRelationsRef(dcInstance, inputVars));
}
;

const updateMedicineCoreRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateMedicineCore', inputVars);
}
updateMedicineCoreRef.operationName = 'UpdateMedicineCore';
exports.updateMedicineCoreRef = updateMedicineCoreRef;

exports.updateMedicineCore = function updateMedicineCore(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateMedicineCoreRef(dcInstance, inputVars));
}
;

const createMedicineVerificationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateMedicineVerification', inputVars);
}
createMedicineVerificationRef.operationName = 'CreateMedicineVerification';
exports.createMedicineVerificationRef = createMedicineVerificationRef;

exports.createMedicineVerification = function createMedicineVerification(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createMedicineVerificationRef(dcInstance, inputVars));
}
;

const setMedicineVerifiedRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SetMedicineVerified', inputVars);
}
setMedicineVerifiedRef.operationName = 'SetMedicineVerified';
exports.setMedicineVerifiedRef = setMedicineVerifiedRef;

exports.setMedicineVerified = function setMedicineVerified(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(setMedicineVerifiedRef(dcInstance, inputVars));
}
;

const createStaffAccountRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateStaffAccount', inputVars);
}
createStaffAccountRef.operationName = 'CreateStaffAccount';
exports.createStaffAccountRef = createStaffAccountRef;

exports.createStaffAccount = function createStaffAccount(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createStaffAccountRef(dcInstance, inputVars));
}
;

const updateStaffStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateStaffStatus', inputVars);
}
updateStaffStatusRef.operationName = 'UpdateStaffStatus';
exports.updateStaffStatusRef = updateStaffStatusRef;

exports.updateStaffStatus = function updateStaffStatus(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateStaffStatusRef(dcInstance, inputVars));
}
;

const listMedicinesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListMedicines');
}
listMedicinesRef.operationName = 'ListMedicines';
exports.listMedicinesRef = listMedicinesRef;

exports.listMedicines = function listMedicines(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listMedicinesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getMedicineBySlugRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMedicineBySlug', inputVars);
}
getMedicineBySlugRef.operationName = 'GetMedicineBySlug';
exports.getMedicineBySlugRef = getMedicineBySlugRef;

exports.getMedicineBySlug = function getMedicineBySlug(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getMedicineBySlugRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listStaffAccountsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListStaffAccounts');
}
listStaffAccountsRef.operationName = 'ListStaffAccounts';
exports.listStaffAccountsRef = listStaffAccountsRef;

exports.listStaffAccounts = function listStaffAccounts(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listStaffAccountsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getStaffAccountByFirebaseUidRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetStaffAccountByFirebaseUid', inputVars);
}
getStaffAccountByFirebaseUidRef.operationName = 'GetStaffAccountByFirebaseUid';
exports.getStaffAccountByFirebaseUidRef = getStaffAccountByFirebaseUidRef;

exports.getStaffAccountByFirebaseUid = function getStaffAccountByFirebaseUid(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getStaffAccountByFirebaseUidRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;
