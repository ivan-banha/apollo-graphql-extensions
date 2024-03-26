import { PluginDefinition } from "apollo-server-core";

export const GetExtensionsPlugin: PluginDefinition = {
  async requestDidStart(requestContext) {
    console.log("Request started:\n" + requestContext.operation?.name);

    return {
      async executionDidStart(executionContext) {
        console.log(
          "executionDidStart, extensions:",
          executionContext.request.extensions,
        );
      },
    };
  },
};
