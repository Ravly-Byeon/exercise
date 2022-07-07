const board ={
    namespaced: true,
    state: {
        selectedCategory: '',

    },
    getters: {
        selectedCategory: (state: any) => state.selectedCategory,
    },
    mutations: {
        selectCategory(state: any, payload: any){
            console.log('mm')
            const { category } = payload;
            state.selectedCategory = category;
        },
    },
    actions: {
        selectCategory(context: any, payload: any){
            console.log(payload, 'hi');
            context.commit('selectCategory', payload);
        }
    }

}

export default board;