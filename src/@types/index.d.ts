interface FetchResponse {
  json(): Promise<any>;
}

//  Server response
// ---------------------------------------------------------------------------

interface Client {
  hasFeatureSupport: boolean;
}

interface Fastly {
  client: Client;
}

interface Host {
  host: string;
  lookup: string;
}

interface Settings {
  initial_delay: number;
  max_tasks: number;
  report_errors: boolean;
  sample_rate: number;
  token: string;
}

interface Server {
  datacenter: string;
}

// Config/tasks
// ---------------------------------------------------------------------------
interface Task {
  name: string;
  req_header: string;
  resource: string;
  resp_header: string;
  type: string;
  weight: number;
}

interface Config {
  session: string;
  hosts: Host;
  settings: Settings;
  server: Server;
  tasks: Task[];
}

// ClientInfo (Raw/cooked)
// ---------------------------------------------------------------------------
interface ClientInfo {
  client_user_agent: string;
  client_ip: string;
  client_asn: string;
  client_region: string;
  client_country_code: string;
  client_continent_code: string;
  client_metro_code: string;
  client_postal_code: string;
  client_conn_speed: string;
  client_gmt_offset: string;
  client_latitude: string;
  client_longitude: string;
  resolver_ip: string;
  resolver_asn: string;
  resolver_region: string;
  resolver_country_code: string;
  resolver_continent_code: string;
  resolver_conn_speed: string;
  resolver_latitude: string;
  resolver_longitude: string;
}

interface RawClientInfo {
  client_user_agent: string;
  client_ip: string;
  client_asn: string;
  client_region: string;
  client_country_code: string;
  client_continent_code: string;
  client_metro_code: string;
  client_postal_code: string;
  client_conn_speed: string;
  client_gmt_offset: string;
  client_latitude: string;
  client_longitude: string;
  resolver_ip: string;
  resolver_asn: string;
  resolver_region: string;
  resolver_country_code: string;
  resolver_continent_code: string;
  resolver_conn_speed: string;
  resolver_latitude: string;
  resolver_longitude: string;
}

// Beacon
// ---------------------------------------------------------------------------
interface Beacon {
  client_asn: number;
  client_conn_speed: string;
  client_continent_code: string;
  client_country_code: string;
  client_gmt_offset: string;
  client_ip: string;
  client_latitude: string;
  client_longitude: string;
  client_metro_code: string;
  client_postal_code: string;
  client_region: string;
  client_user_agent: string;
  resolver_asn: 15169;
  resolver_conn_speed: string;
  resolver_continent_code: string;
  resolver_country_code: string;
  resolver_ip: string;
  resolver_latitude: string;
  resolver_longitude: string;
  resolver_region: string;
  task_client_data: string;
  task_id: string;
  task_schema_version: string;
  task_server_data: string;
  task_type: string;
  test_api_key: string;
  test_id: string;
  test_lib_version: string;
  test_server: string;
  test_timestamp: number;
}
