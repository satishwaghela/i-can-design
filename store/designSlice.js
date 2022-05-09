import { merge } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: uuidv4(),
  name: 'project1',
  theme: ``,
  pages: [{
    id: uuidv4(),
    selected: true,
    panState: {
      zoom: 1,
      position: { x: 650, y: 100 },
      transform: ''
    },
    components: [{
      id: uuidv4(),
      name: 'my_component_1',
      selected: false,
      panState: {
        position: { x:0, y: 0 }
      },
      component: `<Button variant="contained">Submit</Button>`,
      transformedComponent: `/*#__PURE__*/React.createElement(Button, { variant: "contained" }, "Save");`
    }, {
      id: uuidv4(),
      name: 'my_component_2',
      selected: false,
      panState: {
        position: { x: 16, y: 0 }
      },
      component: `<Button variant="contained">Submit</Button>`,
      transformedComponent: `/*#__PURE__*/React.createElement(Button, { variant: "contained" }, "Save");`
    }]
  }]
};

const slice = createSlice({
  name: 'design',
  initialState,
  reducers: {
    updatePanState (state, action) {
      const selectedPage = findSelectedPage(state.pages);
      selectedPage.panState = { ...selectedPage.panState, ...action.payload };
    },
    updateComponentPanState (state, action) {
      const { panState, componentData } = action.payload;
      const selectedPage = findSelectedPage(state.pages);
      const component = findComponentByID(selectedPage.components, componentData.id);
      component.panState = { ...component.panState, ...panState };
    },
    setData (state, action) {
      merge(state, action.payload);
    }
  }
});

export const { reducer } = slice;

const findSelectedPage = (pages) => pages.find(page => page.selected);
const findComponentByID = (components, id) => components.find(component => component.id === id);

export const getSelectedPagePanState = (state) => {
  return findSelectedPage(state.design.pages).panState
};

export const getSelectedPageZoom = (state) => {
  return getSelectedPagePanState(state).zoom;
};

export const getSelectedPage = (state) => {
  return findSelectedPage(state.design.pages);
};

export const getTheme = (state) => {
  return state.design.theme;
};

export const getDesignState = (state) => {
  return state.design;
};

export default slice;