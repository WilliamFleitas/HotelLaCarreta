import { createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface FacilitiesDetail {
    name: string;
    image: string;
    description: string;
    id: string;
}

interface FacilitieState {
    facilitiesList: Array<FacilitiesDetail>;
    loading: boolean;

}

const initialState: FacilitieState ={
    facilitiesList: [],
    loading: false,
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
          },
        setLoading(state, action: PayloadAction<boolean>){
            state.loading = action.payload;
        }
    }
});

export default FacilitieSlice.reducer;
export const {setFacilities, clearFacilities, setLoading} = FacilitieSlice.actions;