# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_dicom_session',
  :secret      => '0786673800d4ba6b32bddf974297ce54cc8c363f5d90225a50e896d283ba4c9a08f5175bcc80c1e5d0a0965cd33145ee3120f5c36aabb0d517845b3fbc3f8f65'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
