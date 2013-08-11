# Be sure to restart your server when you modify this file.

# Your secret key is used for verifying the integrity of signed cookies.
# If you change this key, all old signed cookies will become invalid!

# Make sure the secret is at least 30 characters and all random,
# no regular words or you'll be exposed to dictionary attacks.
# You can use `rake secret` to generate a secure secret key.

# Make sure your secret_key_base is kept private
# if you're sharing your code publicly.
Dicom::Application.config.secret_key_base = '298e69a1bc63d79e364198a6d0c93dc66404374b5c287eecac8f9b37e8721ccde15f58f147048679e4fd8b4bb635c1e7587235f442eee6b6b338777815e0924b'
