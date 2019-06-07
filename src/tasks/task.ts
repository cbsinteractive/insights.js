import assign from "../util/assign";
import { beacon } from "../util/beacon";
import { getClientInfo } from "../util/client-info";

interface State {
  hasRan: boolean;
}

/* eslint-disable @typescript-eslint/camelcase */
const blankBeacon: Beacon = {
  client_user_agent: "",
  client_ip: "",
  client_asn: 0,
  client_region: "",
  client_country_code: "",
  client_continent_code: "",
  client_metro_code: "",
  client_postal_code: "",
  client_conn_speed: "",
  client_gmt_offset: "",
  client_latitude: "",
  client_longitude: "",
  resolver_ip: "",
  resolver_asn: 0,
  resolver_region: "",
  resolver_country_code: "",
  resolver_continent_code: "",
  resolver_conn_speed: "",
  resolver_latitude: "",
  resolver_longitude: "",
  test_id: "",
  test_api_key: "",
  test_lib_version: "",
  test_server: "",
  test_timestamp: 0,
  task_type: "",
  task_id: "",
  task_schema_version: "",
  task_client_data: "",
  task_server_data: ""
};
/* eslint-enable @typescript-eslint/camelcase */

class Task implements TaskInterface {
  private config: Config;
  private taskData: TaskData;
  private beacon: Beacon;
  public state: State = { hasRan: false };

  public constructor(config: Config, taskData: TaskData) {
    // TODO: more strict typing here
    this.beacon = assign({}, blankBeacon);
    this.config = assign({}, config);
    this.taskData = taskData;
  }

  private encode(data: Beacon): string {
    return JSON.stringify(data);
  }

  /**
   * Sending data to the server: fire-and-forget. Not tracking if successful.
   * @param data - JSON-encoded string
   */
  private send(data: string): void {
    const {
      session,
      settings,
      hosts: { host }
    } = this.config;
    const url = `https://${host}/b?k=${settings.token}&s=${session}`;
    beacon(url, data);
  }

  /**
   * Creates an object that can be beaconed to the server
   * @param testResult - comes from this.test()
   * @param clientInfo - comes from getClientInfo()
   */
  private generateBeacon(
    testResult: TestResult,
    clientInfo: ClientInfo
  ): Beacon {
    const { settings, server } = this.config;
    /* eslint-disable @typescript-eslint/camelcase */
    this.beacon = assign(
      {
        test_id: settings.token,
        test_api_key: this.config.settings.token,
        test_lib_version: "<% VERSION %>",
        test_server: JSON.stringify(server),
        test_timestamp: Math.floor(Date.now() / 1000), // Unix timestamp in seconds
        task_type: this.taskData.type,
        task_id: this.taskData.id,
        task_schema_version: "0.0.0",
        task_client_data: JSON.stringify(testResult),
        task_server_data: "<% SERVER_DATA %>"
      },
      clientInfo
    );
    /* eslint-disable @typescript-eslint/camelcase */
    return this.beacon;
  }

  /**
   * ABSTRACT TEST METHOD
   */
  private test(): Promise<TestResult> {
    const mockOutput = { value: `test run ${this.taskData.id}` };
    return Promise.resolve(mockOutput);
  }

  public execute(): Promise<any> {
    const lookup = this.config.hosts.lookup;
    const testId = this.config.settings.token;
    const clientInfoUrl = `https://${testId}.${lookup}/l`;
    return Promise.all([this.test(), getClientInfo(clientInfoUrl)])
      .then((runAndClientInfo): any => this.generateBeacon(...runAndClientInfo))
      .then(this.encode)
      .then((encodedBeacon): void => this.send(encodedBeacon))
      .then((): Beacon => this.beacon) // Clean up return data
      .catch(
        (): Promise<any> => {
          //TODO: do something better than swallowing the error
          return Promise.resolve(this.beacon);
        }
      );
  }
}

export default Task;