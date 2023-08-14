# Blender Rendering and Email Sending

This project demonstrates a workflow to render an image using Blender, modify materials, adjust lighting, and then send the rendered image via email.

## Prerequisites

- Blender 3.6 or later
- Python 3.x

## Installation

1. Download and install Blender from the official website (https://www.blender.org/download/).

2. Clone or download the project files to your local machine.

3. Install the required Python packages by running the following command in the project directory:

4. Open a web browser and go to http://localhost:5000 to access the application.

5. On the web page, enter your email address and click the "Send Email" button.

6. The rendering process will be initiated, and the rendered image will be sent to the provided email address.

## Project Structure

- `main.py`: Flask web application to handle HTTP requests and initiate the rendering process.
- `render.bat`: Windows batch file to execute the rendering process and send the rendered image via email.
- `render.py`: Python script to perform the rendering in Blender, modify materials, adjust lighting, and save the rendered image.
- `send_email.py`: Python script to send an email with the rendered image as an attachment.
- `index.html`: HTML template for the web application's home page.

## Customization

- Modify the `modify_material` function in `render.py` to customize the material modifications.
- Adjust the lighting settings in `render.py` to suit your requirements.
- Update the email sender's credentials and SMTP server details in `send_email.py` to use your own email account.

## Notes

- Make sure the Blender executable path in `render.bat` matches the installed Blender version on your system.
- This project assumes the use of the Cycles rendering engine in Blender. Adjust the code in `render.py` if you wish to use a different rendering engine.

