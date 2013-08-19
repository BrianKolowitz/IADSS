require 'dicom'
include DICOM
server = DServer.new(104, :host_ae => "MY_DICOM_SERVER")
server.start_scp("/tmp/dicom_cache")