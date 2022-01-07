import { createSlice } from "@reduxjs/toolkit";

const drinkSlice = createSlice({
  name: "drink",
  initialState: {
    drinkItems: [
      {
        id: "d1",
        name: "West Coast IPA",
        brewer: "Granville Island",
        type: "Beer",
        description: "This is a very good drink",
        image:
          "https://www.lcbo.com/content/dam/lcbo/products/015656.jpg/jcr:content/renditions/cq5dam.web.1280.1280.jpeg",
        isFavorite: false,
        abv: "6.5%",
      },
      // {
      //   id: "d2",
      //   name: "Kavalan Classic Single Malt Whisky",
      //   brewer: "Kavalan",
      //   type: "Whisky",
      //   description: "This is a very good whisky",
      //   image:
      //     "https://www.kavalanwhisky.com/data/goods/cover/1583222906956089100.png",
      //   isFavorite: false,
      //   abv: "45%",
      // },
    ],
    isDrinkDataFetchRequired: false,
  },
  reducers: {
    replaceDrinkItems(state, action) {
      state.drinkItems = action.payload.drinkItems;
      //state.changed = true;
    },
    addDrinkItem(state, action) {
      const newDrink = action.payload;
      const existingItem = state.drinkItems.find(
        (drink) => drink.id === newDrink.id
      );
      //state.changed = true;
      if (!existingItem) {
        state.drinkItems.push({
          id: newDrink.id,
          name: newDrink.name,
          brewer: newDrink.brewer,
          description: newDrink.description,
          type: newDrink.type,
          image: newDrink.image,
          isFavorite: newDrink.isFavorite,
        });
      }
    },
    removeDrinkItem(state, action) {
      const id = action.payload;
      state.drinkItems.filter((drink) => drink.id !== id);
      // state.changed = true;
    },
    toggleFav(state, action) {
      const id = action.payload;
      const drinkIndex = state.drinkItems.findIndex((drink) => drink.id === id);
      state.drinkItems[drinkIndex].isFavorite =
        !state.drinkItems[drinkIndex].isFavorite;
      //state.changed = true;
    },
    setIsDrinkDataFetchRequired(state) {
      state.isDrinkDataFetchRequired = !state.isDrinkDataFetchRequired;
    },
  },
});

export const drinkActions = drinkSlice.actions;

export default drinkSlice;
