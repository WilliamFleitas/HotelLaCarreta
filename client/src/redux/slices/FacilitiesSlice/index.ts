import { createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface FacilitiesDetail {
    name: string;
    image: string;
    description: string;
    id: string;
}

interface FacilitieState {
    facilitiesList: Array<FacilitiesDetail>;

}

const initialState: FacilitieState ={
    facilitiesList: [],
}

const FacilitieSlice = createSlice({
    name: "Facilities",
    initialState,
    reducers: {
        setFacilities(state, action: PayloadAction<Array<FacilitiesDetail>>) {
            state.facilitiesList = action.payload;
          }, 
          clearFacilities(state){
            state.facilitiesList = [];
          }
    }
});

export default FacilitieSlice.reducer;
export const {setFacilities, clearFacilities} = FacilitieSlice.actions;