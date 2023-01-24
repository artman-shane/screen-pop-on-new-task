import { FlexPlugin } from "@twilio/flex-plugin";

const PLUGIN_NAME = "ScreenPopOnNewTaskPlugin";

export default class ScreenPopOnNewTaskPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   */
  async init(flex, manager) {
    manager.events.addListener("taskAccepted", (task) => {
      try {
        const googleParms = task.attributes.agentHandoffObj;
        const handoffParms =
          googleParms.VirtualAgentProviderData.AgentHandoffParameters;
        const URL =
          (handoffParms.phoneNumber != "$session.params.phoneNumber.resolved" &&
            handoffParms.phoneNumber != "" &&
            `https://whitepages.com/phone/${handoffParms.phoneNumber}`) ||
          `https://whitepages.com/phone/${googleParms.Caller}`;
        window.open(URL, "_blank");
      } catch (e) {
        return;
      }
    });
  }
}
