#!/usr/bin/env python3
"""
AI Hiring System Backend Server Startup Script
This script provides an easy way to start the FastAPI backend server
with proper configuration and error handling.
"""

import os
import sys
import uvicorn
import argparse
from pathlib import Path

def check_dependencies():
    """Check if required dependencies are installed"""
    try:
        import fastapi
        import uvicorn
        import pydantic
        print("✅ All required dependencies are installed")
        return True
    except ImportError as e:
        print(f"❌ Missing dependency: {e}")
        print("Please install dependencies with: pip install -r requirements.txt")
        return False

def check_ai_system():
    """Check if the AI hiring system module is available"""
    try:
        # Add parent directory to path
        parent_dir = Path(__file__).parent.parent
        sys.path.append(str(parent_dir))
        
        from ai_hiring_system import (
            Candidate, Job, EvaluationResult, ResumeParser, 
            SkillsMatcher, BiasDetector, CandidateEvaluator, 
            HiringDatabase, HiringAnalytics
        )
        print("✅ AI Hiring System module found")
        return True
    except ImportError as e:
        print(f"❌ AI Hiring System module not found: {e}")
        print("Please ensure ai_hiring_system.py is in the parent directory")
        return False

def start_server(host="0.0.0.0", port=8000, reload=False, debug=False):
    """Start the FastAPI server"""
    try:
        print(f"🚀 Starting AI Hiring System Backend Server...")
        print(f"📍 Host: {host}")
        print(f"🔌 Port: {port}")
        print(f"🔄 Reload: {reload}")
        print(f"🐛 Debug: {debug}")
        print("=" * 50)
        
        # Set environment variables
        os.environ["API_HOST"] = host
        os.environ["API_PORT"] = str(port)
        os.environ["DEBUG"] = str(debug).lower()
        
        # Start the server
        uvicorn.run(
            "app:app",
            host=host,
            port=port,
            reload=reload,
            log_level="info" if debug else "warning"
        )
        
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
    except Exception as e:
        print(f"❌ Error starting server: {e}")
        sys.exit(1)

def main():
    """Main function to parse arguments and start server"""
    parser = argparse.ArgumentParser(
        description="AI Hiring System Backend Server",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python start_server.py                    # Start with default settings
  python start_server.py --port 8080       # Start on port 8080
  python start_server.py --reload          # Start with auto-reload
  python start_server.py --debug           # Start in debug mode
  python start_server.py --host 127.0.0.1  # Start on localhost only
        """
    )
    
    parser.add_argument(
        "--host",
        default="0.0.0.0",
        help="Host to bind to (default: 0.0.0.0)"
    )
    
    parser.add_argument(
        "--port",
        type=int,
        default=8000,
        help="Port to bind to (default: 8000)"
    )
    
    parser.add_argument(
        "--reload",
        action="store_true",
        help="Enable auto-reload for development"
    )
    
    parser.add_argument(
        "--debug",
        action="store_true",
        help="Enable debug mode with verbose logging"
    )
    
    parser.add_argument(
        "--check",
        action="store_true",
        help="Only check dependencies and exit"
    )
    
    args = parser.parse_args()
    
    # Print banner
    print("🤖 AI Hiring System Backend Server")
    print("=" * 50)
    
    # Check dependencies
    if not check_dependencies():
        sys.exit(1)
    
    # Check AI system module
    if not check_ai_system():
        sys.exit(1)
    
    # If only checking dependencies, exit here
    if args.check:
        print("✅ All checks passed!")
        return
    
    # Start the server
    start_server(
        host=args.host,
        port=args.port,
        reload=args.reload,
        debug=args.debug
    )

if __name__ == "__main__":
    main()
