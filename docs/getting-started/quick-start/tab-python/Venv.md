
# Using Virtual Environments

Create isolated Python environments using `venv`.

## Steps

1. **Create a Virtual Environment:**

   ```bash
   python3 -m venv venv
   ```

2. **Activate the Virtual Environment:**

   - On Linux/macOS:

     ```bash
     source venv/bin/activate
     ```

   - On Windows:

     ```bash
     venv\Scripts\activate
     ```

3. **Install Sage WebUI:**

   ```bash
   pip install sage-open-webui
   ```

4. **Start the Server:**

   ```bash
   sage-open-webui serve
   ```
