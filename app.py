from flask import Flask, render_template, request, send_from_directory
import os


app = Flask(__name__)

# Folder to store uploaded files
UPLOAD_FOLDER = r'static/certificates'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def search_certificate(file_path, student_no):
    """
    Search for a file corresponding to the student's number in the specified folder.
    """
    allowed_extensions = {'.png', '.jpg', '.jpeg', '.pdf'}

    if not os.path.isdir(file_path):
        print(f"The folder '{file_path}' does not exist.")
        return None

    for file in os.listdir(file_path):
        # Check if the file name matches the student's number
        if file.startswith(student_no):
            _, extension = os.path.splitext(file)
            if extension.lower() in allowed_extensions:
                return file

    return None

@app.route('/')
def index():
    return render_template('landing_page.html')

@app.route('/landing_page.html')
def landing_page():
    return render_template('landing_page.html')
    

@app.route('/about.html')
def about():
    return render_template('about.html')

@app.route('/longpage.html')
def longpage():
    return render_template('about.html')

@app.route('/faq.html')
def faq():
    return render_template('faq.html')

@app.route('/org_kadesis.html')
def org_kadesis():
    return render_template('org_kadesis.html')

@app.route('/certificate.html', methods=['POST', 'GET'])
def certificate():
    if request.method == "POST":
        stno = request.form['student_no']

        # Search for the student's certificate
        certificate_name = search_certificate(app.config['UPLOAD_FOLDER'], stno)
        
        if certificate_name:
            # Send the file to the client
            return send_from_directory(app.config['UPLOAD_FOLDER'], certificate_name, as_attachment=True)
        else:
            # If no certificate is found, return an error page
            return render_template('not_found.html'), 404
    else:
        return render_template("certificate.html")

if __name__ == '__main__':
    app.run(debug=False)
