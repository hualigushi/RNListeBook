import { Effect, Model } from "dva-core-ts";
import { Reducer } from "redux";
interface HomeState {
    num: number;
}
interface HomeModel extends Model {
    namespace: 'home';
    state: HomeState;
    reducers:{
        add:Reducer<HomeState>
    };
    effects: {
        asyncAdd: Effect;
    }
}
const homeModel:HomeModel = {
    namespace: 'home',
    state:{
        num:0
    },
    reduces:{
        add(state, {payload}){
            return {
                ...state,
                num: state.num + payload.num
            }
        }
    }
}
export default homeModel;