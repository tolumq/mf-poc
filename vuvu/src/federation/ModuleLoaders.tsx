import * as React from "react";
import useDynamicScript from './useDynamicScript';


type Scope = unknown;
type Factory = () => any;

export type ModuleScopes = "home"; // all the types imported in webpack module federation

export type DynamicModule = {
  module: string;
  url: string;
  scope: ModuleScopes;
}

type Container = {
    init(shareScript: Scope): void;
    get(module: string): Factory;
}

declare const __webpack_init_sharing__: (shareScope: string) => Promise<void>;
declare const __webpack_share_scopes__: { default: Scope };


function loadComponent(scope: ModuleScopes, module: string) {
  return async () => {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__("default");
    const container = window[scope] as Container; // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    await container.init(__webpack_share_scopes__.default);
    const factory = await window[scope].get(module);
    const Module = factory();
    return Module;
  };
}

function ModuleLoader(props: DynamicModule) {
  const { ready, failed } = useDynamicScript(props.url);

  if (!props.module) {
    return <h2>Not Remote Module specified</h2>;
  }

  if (!ready) {
    return <h2>Loading dynamic script: {props.url}</h2>;
  }

  if (failed) {
    return <h2>Failed to load dynamic script: {props.url}</h2>;
  }

  const Component = React.lazy(
    loadComponent(props.scope, props.module)
  );

  return (
      <Component />
  );
}

export default ModuleLoader;