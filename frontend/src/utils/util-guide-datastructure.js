const GUIDE_DATASTRUCTURE = 
`Id       string \`bson:"_id"\`
Name     string \`bson:"name" json:"name" binding:"-"\`
Autoruns []struct {
  Caption  string \`bson:"caption" json:"caption" binding:"-"\`
  Command  string \`bson:"command" json:"command" binding:"-"\`
  Location string \`bson:"location" json:"location" binding:"-"\`
  Name     string \`bson:"name" json:"name" binding:"-"\`
  Sha256   string \`bson:"sha256" json:"sha256" binding:"-"\`
  Signed   int    \`bson:"signed" json:"signed" binding:"-"\`
  User     string \`bson:"user" json:"user" binding:"-"\`
} \`bson:"autoruns" json:"autoruns" binding:"-"\`
EventLog struct {
  Security []struct {
    EventID    int    \`bson:"EventID" json:"EventID" binding:"-"\`
    SystemTime string \`bson:"SystemTime" json:"SystemTime" binding:"-"\`
  } \`bson:"security" json:"security" binding:"-"\`
} \`bson:"event_log" json:"event_log" binding:"-"\`
Files []struct {
  Image  string \`bson:"image" json:"image" binding:"-"\`
  Sha256 string \`bson:"sha256" json:"sha256" binding:"-"\`
  Signed int    \`bson:"signed" json:"signed" binding:"-"\`
} \`bson:"files" json:"files" binding:"-"\`
Hardware struct {
  Bios []struct {
    Description    string \`bson:"description" json:"description" binding:"-"\`
    Manufacturer   string \`bson:"manufacturer" json:"manufacturer" binding:"-"\`
    Name           string \`bson:"name" json:"name" binding:"-"\`
    ReleaseDate    string \`bson:"release_date" json:"release_date" binding:"-"\`
    SmbbiosVersion string \`bson:"smbbios_version" json:"smbbios_version" binding:"-"\`
    Version        string \`bson:"version" json:"version" binding:"-"\`
  } \`bson:"bios" json:"bios" binding:"-"\`
  Cpus []struct {
    L2cacheSize               string \`bson:"L2cache_size" json:"L2cache_size" binding:"-"\`
    L2cacheSpeed              string \`bson:"L2cache_speed" json:"L2cache_speed" binding:"-"\`
    L3cacheSize               string \`bson:"L3cache_size" json:"L3cache_size" binding:"-"\`
    L3cacheSpeed              string \`bson:"L3cache_speed" json:"L3cache_speed" binding:"-"\`
    Architecture              string \`bson:"architecture" json:"architecture" binding:"-"\`
    Caption                   string \`bson:"caption" json:"caption" binding:"-"\`
    DeviceId                  string \`bson:"device_id" json:"device_id" binding:"-"\`
    Manufacturer              string \`bson:"manufacturer" json:"manufacturer" binding:"-"\`
    MaxClockSpeed             string \`bson:"max_clock_speed" json:"max_clock_speed" binding:"-"\`
    Name                      string \`bson:"name" json:"name" binding:"-"\`
    NumberOfCores             string \`bson:"number_of_cores" json:"number_of_cores" binding:"-"\`
    NumberOfEnableCores       string \`bson:"number_of_enable_cores" json:"number_of_enable_cores" binding:"-"\`
    NumberOfLogicalProcessors string \`bson:"number_of_logical_processors" json:"number_of_logical_processors" binding:"-"\`
    ProcessorId               string \`bson:"processor_id" json:"processor_id" binding:"-"\`
    Revision                  string \`bson:"revision" json:"revision" binding:"-"\`
    SerialNumber              string \`bson:"serial_number" json:"serial_number" binding:"-"\`
    SoketDesignation          string \`bson:"soket_designation" json:"soket_designation" binding:"-"\`
    Status                    string \`bson:"status" json:"status" binding:"-"\`
    ThreadCount               string \`bson:"thread_count" json:"thread_count" binding:"-"\`
  } \`bson:"cpus" json:"cpus" binding:"-"\`
  Graphics []struct {
    PNP_device_id        string \`bson:"PNP_device_id" json:"PNP_device_id" binding:"-"\`
    AdapterRAM           string \`bson:"adapter_RAM" json:"adapter_RAM" binding:"-"\`
    AdapterCompatibility string \`bson:"adapter_compatibility" json:"adapter_compatibility" binding:"-"\`
    Caption              string \`bson:"caption" json:"caption" binding:"-"\`
    DriverDate           string \`bson:"driver_date" json:"driver_date" binding:"-"\`
    DriverVersion        string \`bson:"driver_version" json:"driver_version" binding:"-"\`
    InfSection           string \`bson:"inf_section" json:"inf_section" binding:"-"\`
    Manufacturer         string \`bson:"manufacturer" json:"manufacturer" binding:"-"\`
    Name                 string \`bson:"name" json:"name" binding:"-"\`
    Status               string \`bson:"status" json:"status" binding:"-"\`
    VideoModeDescription string \`bson:"video_mode_description" json:"video_mode_description" binding:"-"\`
    VideoProcessor       string \`bson:"video_processor" json:"video_processor" binding:"-"\`
  } \`bson:"graphics" json:"graphics" binding:"-"\`
  MainBoard []struct {
    Caption      string \`bson:"caption" json:"caption" binding:"-"\`
    Description  string \`bson:"description" json:"description" binding:"-"\`
    Manufacturer string \`bson:"manufacturer" json:"manufacturer" binding:"-"\`
    Model        string \`bson:"model" json:"model" binding:"-"\`
    Product      string \`bson:"product" json:"product" binding:"-"\`
    SerialNumber string \`bson:"serial_number" json:"serial_number" binding:"-"\`
    Version      string \`bson:"version" json:"version" binding:"-"\`
  } \`bson:"main_board" json:"main_board" binding:"-"\`
  Memories []struct {
    Caption             string \`bson:"caption" json:"caption" binding:"-"\`
    ConfigureClockSpeed string \`bson:"configure_clock_speed" json:"configure_clock_speed" binding:"-"\`
    ConfigureVoltage    string \`bson:"configure_voltage" json:"configure_voltage" binding:"-"\`
    DataWidth           string \`bson:"data_width" json:"data_width" binding:"-"\`
    Description         string \`bson:"description" json:"description" binding:"-"\`
    DeviceLocator       string \`bson:"device_locator" json:"device_locator" binding:"-"\`
    Manufacturer        string \`bson:"manufacturer" json:"manufacturer" binding:"-"\`
    MemoryType          string \`bson:"memory_type" json:"memory_type" binding:"-"\`
    PartNumber          string \`bson:"part_number" json:"part_number" binding:"-"\`
    SerialNumber        string \`bson:"serial_number" json:"serial_number" binding:"-"\`
    Size                string \`bson:"size" json:"size" binding:"-"\`
  } \`bson:"memories" json:"memories" binding:"-"\`
  Storage struct {
    Logical []struct {
      Caption      string \`bson:"caption" json:"caption" binding:"-"\`
      DeviceId     string \`bson:"device_id" json:"device_id" binding:"-"\`
      Driver       string \`bson:"driver" json:"driver" binding:"-"\`
      FileSystem   string \`bson:"file_system" json:"file_system" binding:"-"\`
      FreeSpace    string \`bson:"free_space" json:"free_space" binding:"-"\`
      Label        string \`bson:"label" json:"label" binding:"-"\`
      SerialNumber string \`bson:"serial_number" json:"serial_number" binding:"-"\`
      Size         string \`bson:"size" json:"size" binding:"-"\`
    } \`bson:"logical" json:"logical" binding:"-"\`
    Physical []struct {
      Caption           string \`bson:"caption" json:"caption" binding:"-"\`
      FirmwareRevision  string \`bson:"firmware_revision" json:"firmware_revision" binding:"-"\`
      InterfaceType     string \`bson:"interface_type" json:"interface_type" binding:"-"\`
      Manufacturer      string \`bson:"manufacturer" json:"manufacturer" binding:"-"\`
      MediaType         string \`bson:"media_type" json:"media_type" binding:"-"\`
      Model             string \`bson:"model" json:"model" binding:"-"\`
      Name              string \`bson:"name" json:"name" binding:"-"\`
      PnpDeviceId       string \`bson:"pnp_device_id" json:"pnp_device_id" binding:"-"\`
      ScsiBus           string \`bson:"scsi_bus" json:"scsi_bus" binding:"-"\`
      ScsiLogicalInit   string \`bson:"scsi_logical_init" json:"scsi_logical_init" binding:"-"\`
      ScsiPort          string \`bson:"scsi_port" json:"scsi_port" binding:"-"\`
      ScsiTargetId      string \`bson:"scsi_target_id" json:"scsi_target_id" binding:"-"\`
      SectorsPerTrack   string \`bson:"sectors_per_track" json:"sectors_per_track" binding:"-"\`
      SerialNumber      string \`bson:"serial_number" json:"serial_number" binding:"-"\`
      Size              string \`bson:"size" json:"size" binding:"-"\`
      TotalCylinders    string \`bson:"total_cylinders" json:"total_cylinders" binding:"-"\`
      TotalHeads        string \`bson:"total_heads" json:"total_heads" binding:"-"\`
      TotalSectors      string \`bson:"total_sectors" json:"total_sectors" binding:"-"\`
      TotalTrack        string \`bson:"total_track" json:"total_track" binding:"-"\`
      TracksPerCylinder string \`bson:"tracks_per_cylinder" json:"tracks_per_cylinder" binding:"-"\`
    } \`bson:"physical" json:"physical" binding:"-"\`
  } \`bson:"storage" json:"storage" binding:"-"\`
} \`bson:"hardware" json:"hardware" binding:"required"\`
Networks struct {
  DnsCache []string \`bson:"dns_cache" json:"dns_cache" binding:"-"\`
  Netstat  []struct {
    Local      string \`bson:"local" json:"local" binding:"-"\`
    LocalPort  string \`bson:"local_port" json:"local_port" binding:"-"\`
    Pid        int    \`bson:"pid" json:"pid" binding:"-"\`
    Remote     string \`bson:"remote" json:"remote" binding:"-"\`
    RemotePort string \`bson:"remote_port" json:"remote_port" binding:"-"\`
    State      string \`bson:"state" json:"state" binding:"-"\`
  } \`bson:"netstat" json:"netstat" binding:"-"\`
} \`bson:"networks" json:"networks" binding:"-"\`
NetworksAdapter []struct {
  AdapterDesc string \`bson:"AdapterDesc" json:"AdapterDesc" binding:"-"\`
  Gateway     string \`bson:"Gateway" json:"Gateway" binding:"-"\`
  IPAddress   string \`bson:"IPAddress" json:"IPAddress" binding:"-"\`
  MAC         string \`bson:"MAC" json:"MAC" binding:"-"\`
  Type        string \`bson:"Type" json:"Type" binding:"-"\`
} \`bson:"networks_adapter" json:"networks_adapter" binding:"-"\`
Os struct {
  Architecture         string   \`bson:"architecture" json:"architecture" binding:"-"\`
  BuildNumber          string   \`bson:"build_number" json:"build_number" binding:"-"\`
  ComputerName         string   \`bson:"computer_name" json:"computer_name" binding:"-"\`
  InstallDate          string   \`bson:"install_date" json:"install_date" binding:"-"\`
  MaxNumberOfProcesses string   \`bson:"max_number_of_processes" json:"max_number_of_processes" binding:"-"\`
  Name                 string   \`bson:"name" json:"name" binding:"-"\`
  NumberOfProcesses    string   \`bson:"number_of_processes" json:"number_of_processes" binding:"-"\`
  NumberOfUsers        string   \`bson:"number_of_users" json:"number_of_users" binding:"-"\`
  OsName               string   \`bson:"os_name" json:"os_name" binding:"-"\`
  ProcessMemorySize    string   \`bson:"process_memory_size" json:"process_memory_size" binding:"-"\`
  RegisteredUser       string   \`bson:"registered_user" json:"registered_user" binding:"-"\`
  SerialNumber         string   \`bson:"serial_number" json:"serial_number" binding:"-"\`
  Users                []string \`bson:"users" json:"users" binding:"-"\`
  Version              string   \`bson:"version" json:"version" binding:"-"\`
} \`bson:"os" json:"os" binding:"-"\`
Printers []struct {
  DeviceId    string \`bson:"device_id" json:"device_id" binding:"-"\`
  DriverName  string \`bson:"driver_name" json:"driver_name" binding:"-"\`
  InstallDate string \`bson:"install_date" json:"install_date" binding:"-"\`
  Name        string \`bson:"name" json:"name" binding:"-"\`
  PortName    string \`bson:"port_name" json:"port_name" binding:"-"\`
  Status      string \`bson:"status" json:"status" binding:"-"\`
} \`bson:"printers" json:"printers" binding:"-"\`
Processes []struct {
  CommandLine string \`bson:"command_line" json:"command_line" binding:"-"\`
  Image       string \`bson:"image" json:"image" binding:"-"\`
  Modules     []struct {
    Image  string \`bson:"image" json:"image" binding:"-"\`
    Sha256 string \`bson:"sha256" json:"sha256" binding:"-"\`
    Signed int    \`bson:"signed" json:"signed" binding:"-"\`
  } \`bson:"modules" json:"modules" binding:"-"\`
  Name     string \`bson:"name" json:"name" binding:"-"\`
  Pid      int    \`bson:"pid" json:"pid" binding:"-"\`
  Ppid     int    \`bson:"ppid" json:"ppid" binding:"-"\`
  Sha256   string \`bson:"sha256" json:"sha256" binding:"-"\`
  Signed   int    \`bson:"signed" json:"signed" binding:"-"\`
  UserName string \`bson:"user_name" json:"user_name" binding:"-"\`
} \`bson:"processes" json:"processes" binding:"-"\`
Registry         []map[string]interface{} \`bson:"registry" json:"registry" binding:"-"\`
SecuritySettings struct {
  UACLevel    int    \`bson:"UAC_level" json:"UAC_level" binding:"-"\`
  AvInstalled string \`bson:"av_installed" json:"av_installed" binding:"-"\`
  Firewall    string \`bson:"firewall" json:"firewall" binding:"-"\`
  Hotfixs     struct {
    Hotfixs []struct {
      Description string \`bson:"description" json:"description" binding:"-"\`
      HotfixId    string \`bson:"hotfix_id" json:"hotfix_id" binding:"-"\`
      InstalledBy string \`bson:"installed_by" json:"installed_by" binding:"-"\`
      InstalledOn string \`bson:"installed_on" json:"installed_on" binding:"-"\`
      Name        string \`bson:"name" json:"name" binding:"-"\`
    } \`bson:"hotfixs" json:"hotfixs" binding:"-"\`
    LastDownloadsPurgeTime string \`bson:"last_downloads_purge_time" json:"last_downloads_purge_time" binding:"-"\`
    ReleaseId              string \`bson:"release_id" json:"release_id" binding:"-"\`
    Version                string \`bson:"version" json:"version" binding:"-"\`
  } \`bson:"hotfixs" json:"hotfixs" binding:"-"\`
} \`bson:"security_settings" json:"security_settings" binding:"-"\`
Services []struct {
  Account     string \`bson:"account" json:"account" binding:"-"\`
  Dependencie string \`bson:"dependencie" json:"dependencie" binding:"-"\`
  Image       string \`bson:"image" json:"image" binding:"-"\`
  Name        string \`bson:"name" json:"name" binding:"-"\`
  ServiceType string \`bson:"service_type" json:"service_type" binding:"-"\`
  Sha256      string \`bson:"sha256" json:"sha256" binding:"-"\`
  Signed      int    \`bson:"signed" json:"signed" binding:"-"\`
  StartType   string \`bson:"start_type" json:"start_type" binding:"-"\`
  TagId       int    \`bson:"tag_id" json:"tag_id" binding:"-"\`
} \`bson:"services" json:"services" binding:"-"\`
Softwares []struct {
  Location  string \`bson:"location" json:"location" binding:"-"\`
  Name      string \`bson:"name" json:"name" binding:"-"\`
  Publisher string \`bson:"publisher" json:"publisher" binding:"-"\`
  Version   string \`bson:"version" json:"version" binding:"-"\`
  Files     []struct {
    Image  string \`bson:"image" json:"image" binding:"-"\`
    Sha256 string \`bson:"sha256" json:"sha256" binding:"-"\`
    Signed int    \`bson:"signed" json:"signed" binding:"-"\`
  } \`bson:"files" json:"files" binding:"-"\`
} \`bson:"softwares" json:"softwares" binding:"-"\`
Vba []struct {
  Image  string \`bson:"image" json:"image" binding:"-"\`
  Sha256 string \`bson:"sha256" json:"sha256" binding:"-"\`
  Vba    []struct {
    VbaCode   string \`bson:"vba_code" json:"vba_code" binding:"-"\`
    OleStream string \`bson:"ole_stream" json:"ole_stream" binding:"-"\`
  } \`bson:"vba" json:"vba" binding:"-"\`
} \`bson:"vba_extract" json:"vba_extract" binding:"-"\`
Time     time.Time \`bson:"time" json:"time" \`
TimeScan string    \`bson:"time_scan" json:"time_scan" \`
Risks    []Risk    \`bson:"risks" json:"risks" binding:"-"\`
Done     bool      \`bson:"done" json:"done" binding:"-"\``;

export function getGuideDatastructureInnerHtml() {
  return GUIDE_DATASTRUCTURE
    .replace(/\n/g, '<br>')
    .replace(/\s/g, '&nbsp;');
}
