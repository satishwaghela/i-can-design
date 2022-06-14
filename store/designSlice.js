import { merge } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { createSlice } from '@reduxjs/toolkit';

const getDefaultComponentState = () => {
  return {
    id: uuidv4(),
    name: 'my_component_1',
    selected: false,
    component: `
<Box
  sx={{
    // width: '100px',
    // height: '100px',
  }}
>
  New Component
</Box>
`,
    transformedComponent: `/*#__PURE__*/React.createElement(Button, { variant: "contained" }, "Save");`
  }
};

const initialState = {
  id: uuidv4(),
  name: 'project1',
  theme: ``,
  pages: [{
    id: uuidv4(),
    selected: true,
    panState: {
      zoom: 1,
      position: { x: 0, y: 0 },
      transform: ''
    },
    components: [{
      ...getDefaultComponentState(),
      panState: {
        position: { x:0, y: 0 }
      },
    }, {
      ...getDefaultComponentState(),
      panState: {
        position: { x:160, y: 0 }
      },
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
    selectComponent (state, action) {
      const componentData = action.payload;
      const selectedPage = findSelectedPage(state.pages);
      selectedPage.components.forEach(component => component.selected = false);
      const component = findComponentByID(selectedPage.components, componentData.id);
      if (component.selected) {
        component.selected = false;
      } else {
        component.selected = true;
      }
    },
    updateComponent (state, action) {
      const componentData = action.payload;
      const selectedPage = findSelectedPage(state.pages);
      const component = findComponentByID(selectedPage.components, componentData.id);
      merge(component, componentData);
    },
    addComponent (state, action) {
      const componentData = getDefaultComponentState();
      componentData.panState = {
        position: { x: 0, y: 0 }
      };
      const selectedPage = findSelectedPage(state.pages);
      selectedPage.components.push(componentData);
    },
    setComponents (state, action) {
      const selectedPage = findSelectedPage(state.pages);
      selectedPage.components = action.payload;
    },
    setData (state, action) {
      merge(state, action.payload);
    }
  }
});

export const { reducer } = slice;

const findSelectedPage = (pages) => pages.find(page => page.selected);
const findComponentByID = (components, id) => components.find(component => component.id === id);

export const filterSelectedComponents = (state) => {
  const selectedPage = findSelectedPage(state.design.pages);
  const components = selectedPage.components.filter(component => component.selected);
  return components;
};

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