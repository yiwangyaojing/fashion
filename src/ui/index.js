import Vue from 'vue';
import './global';
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const requireComponent = require.context('.', false, /\.vue$/);

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);
  let componentName = capitalizeFirstLetter(fileName.replace(/^\.\//, '').replace(/\.\w+$/, ''));
  const component = componentConfig.default || componentConfig;
  componentName = component.name || componentName;
  Vue.component(componentName, componentConfig.default || componentConfig);
});
