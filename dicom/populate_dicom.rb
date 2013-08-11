# Libraries required:
require 'find'
require 'active_record'
require 'dicom'

# Load your yml config from rails:
db_config = YAML::load(File.open("./config/database.yml"))
# Connect to the proper database:
ActiveRecord::Base.establish_connection(db_config['development'])
# Load the custom model we created earlier:
require './app/models/examination'
# Discover all the files contained in the specified directory and all its sub-directories:
dirs = ["/home/parallels/dicomdir"]
files = Array.new
for dir in dirs
  Find.find(dir) do |path|
    if FileTest.directory?(path)
      next
    else
      files << path  # Store the file in our array
    end
  end
end
# Use a loop to run through all the files, reading its data and transferring it to the database.
files.each do |file|
  # Read the file:
  dcm = DICOM::DObject.read(file)
  # If the file was read successfully as a DICOM file, go ahead and extract content:
  if dcm.read?
    study = dcm.value("0008,1030")
    name = dcm.value("0010,0010")
    voltage = dcm.value("0018,0060")
    current = dcm.value("0018,1151")
    exposure = dcm.value("0018,1152")
    # Store the data in the database:
    e = Examination.new
    e.study = study
    e.name = name
    e.voltage = voltage
    e.current = current
    e.exposure = exposure
    e.save
  end
end