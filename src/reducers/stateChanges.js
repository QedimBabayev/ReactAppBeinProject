import { UPDATE_STATESPRODUCT,UPDATE_SELECTED_ROWS, UPDATE_SUBMITFORM, UPDATE_STATESENTER, UPDATE_STATELOSS, UPDATE_STATEMOVE, UPDATE_STATECREATED, UPDATE_SELECTPRODUCTMULTI, UPDATE_SELECTPRODUCTMULTICONFIRM, MODAL_OPEN,CREATEPRODUCTGROUP_MODAL_OPEN } from '../actions/updateStates-action'


const filterState = {
    productFilter: false,
    enterFilter: false,
    lossFilter: false,
    moveFilter: false,
    openCreateModal:false,
    openCreateGroupModal:false,
    selectedRows:[],
    selectedRowsId:[],
    created: ''
}
function stateChanges(state = filterState, action) {

    switch (action.type) {


        case UPDATE_STATECREATED:
            return {
                ...state,
                created: action.payload.created,
            };

            case UPDATE_SELECTED_ROWS:
                return {
                    ...state,
                    selectedRows: action.payload.selectedRows,
                    selectedRowsId: action.payload.selectedRowsId,
                };
    
        case MODAL_OPEN:
            return {
                ...state,
                openCreateModal: action.payload.openModal,
            };
            case CREATEPRODUCTGROUP_MODAL_OPEN:
                return {
                    ...state,
                    openCreateGroupModal: action.payload.openModal,
                };
            
        case UPDATE_SELECTPRODUCTMULTI:
            return {
                ...state,
                multiselectproducts: action.payload.selectedProducts,
                multiselectproductsrow: action.payload.selectedProductsRow,
            };
        case UPDATE_SELECTPRODUCTMULTICONFIRM:
            return {
                ...state,
                isConfirm: action.payload.confirm,
                isNewProduct: action.payload.new,
                isAddProduct:action.payload.added,
                defaults : action.payload.defaultPositions,
            };
        case UPDATE_SUBMITFORM:
            return {
                ...state,
                isSubmit: action.payload.subnmit,
            };
        case UPDATE_STATESPRODUCT:
            return {
                ...state,
                productFilter: action.payload.filterChanged,
            };
        case UPDATE_STATESENTER:
            return {
                ...state,
                enterFilter: action.payload.filterChanged,
            };
        case UPDATE_STATELOSS:
            return {
                ...state,
                lossFilter: action.payload.filterChanged,
            };
        case UPDATE_STATEMOVE:
            return {
                ...state,
                moveFilter: action.payload.filterChanged,
            };

        default:
            return state;
    }

}

export default stateChanges