### Installation with `uv` 

The `uv` runtime manager ensures seamless Python environment management for applications like Sage WebUI. Follow these steps to get started:

#### 1. Install `uv`

Pick the appropriate installation command for your operating system:

- **macOS/Linux**:  
  ```bash
  curl -LsSf https://astral.sh/uv/install.sh | sh
  ```

- **Windows**:  
  ```powershell
  powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
  ```

#### 2. Run Sage WebUI

Once `uv` is installed, running Sage WebUI is a breeze. Use the command below, ensuring to set the `DATA_DIR` environment variable to avoid data loss. Example paths are provided for each platform:

- **macOS/Linux**:  
  ```bash
  DATA_DIR=~/.sage-open-webui uvx --python 3.11 sage-open-webui@latest serve
  ```

- **Windows**:  
  ```powershell
  $env:DATA_DIR="C:\sage-open-webui\data"; uvx --python 3.11 sage-open-webui@latest serve
  ```
