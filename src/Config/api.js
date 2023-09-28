const port = "http://172.31.71.2:4000";
// const port = "http://192.168.30.47:4000";

//api part master part number
export const createMasterPartNumberApi = `${port}/api/masterPartNumber/create`;
export const getAllMasterPartNumberApi = `${port}/api/masterPartNumber/getAll`;
export const getMasterPartNumberByPartNoApi = (id) => {
  return `${port}/api/masterPartNumber/getByPartNo/${id}}`;
};
export const updateMasterPartNumberApi = `${port}/api/masterPartNumber/update`;

//api master production qty
export const createMasterProductionQtyApi = `${port}/api/masterProductionQty/create`;
export const updateMasterProductionQtyApi = `${port}/api/masterProductionQty/update`;
export const getMasterProductionQtyApi = `${port}/api/masterProductionQty/getAll`;

//api master line
export const createMasterLineApi = `${port}/api/line/create`;
export const getAllMasterLineAPi = `${port}/api/line/getAll`;

//api master machine
export const createMasterMachineApi = `${port}/api/machine/create`;
export const deleteMasterMachineByIdApi = (id) => {
  return `${port}/api/machine/delete/${id};`;
};

//api pulling
export const createTransactionPullingApi = `${port}/api/pulling/create`;
export const getTransactionPullingApi = `${port}/api/pulling/getTransactionPulling`;

//api pulling detail
export const createTransactionDetailPullingApi = `${port}/api/pullingDetail/create`;
export const getTransactionDetailPullingByIdApi = (id) => {
  return `${port}/api/pullingDetail/getTransactionDetailPullingByPullingId/${id}`;
};

export const deleteTransactionDetailPullingByIdApi = (id) => {
  return `${port}/api/pullingDetail/pullingDetail/delete/${id}`;
};

//shoplist
export const createShopListApi = `${port}/api/shoplist/create`;
export const deleteShopListByIdApi = (id) => {
  return `${port}/api/shoplist/delete/${id}`;
};

export const getShopListAPi = `${port}/api/shoplist/getShopList`;
export const updateShopListApi = `${port}/api/shoplist/update`;

//api receiving
export const createTransactionReceivingApi = `${port}/api/receiving/create`;
export const getTransactionReceivingApi = `${port}/api/receiving/getTransactionReceiving`;
export const getTransactionReceivingBySjcodeApi = (id) => {
  return `${port}/api/receiving/getBySjcode/${id}`;
};
