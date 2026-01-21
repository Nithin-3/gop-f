# Neurolingua Frontend (gop-f)

A modern, responsive React-based frontend for the Neurolingua online learning platform, featuring a premium Google Meet-inspired live classroom experience.

## Live Classroom System (`/liveclass`)

The live class feature is a custom WebRTC implementation designed for high-quality, 1-to-many and 1-to-1 video education.

### Key Technical Architecture

1. **Multi-User Mesh WebRTC**:
   - Unlike standard 1-on-1 calls, the system uses a "Mesh" architecture.
   - **Teachers** maintain a dedicated `RTCPeerConnection` for every student in the room.
   - **Students** maintain a connection to the teacher.

2. **Google Meet Inspired UI**:
   - **Dynamic Grid**: The video stage automatically re-configures (1x1, 2x2, 3x2, etc.) based on the number of active students.
   - **Floating PIP**: Your local video is a sleek Picture-in-Picture window, allowing you to focus on the presentation.
   - **Interactive Dock**: A centered, transparent control bar for toggling media, leaving, and teacher moderation.

3. **Advanced Resource Management**:
   - **Hardware Cleanup**: Guaranteed release of camera and microphone hardware on leave, refresh, or tab close.
   - **Adaptive Bandwidth**: Uses optimized constraints (640x480 ideal) to ensure stability on slower connections.

### Main Performance Features

- **Dynamic Viewport (`100dvh`)**: Fixed mobile layout issues where browser bars would hide buttons.
- **Role-Based Logic**: 
  - **Teachers** have the manual "Start Class" and "Mute All" controls.
  - **Students** have a "Waiting for Teacher" preview mode with live status polling.

## Project Structure

- `src/components/templates/common/liveStream/`: The core video call logic and styles.
- `src/context/socketContext.js`: Global provider for real-time communication.
- `src/store/`: Redux-based state management for user profiles and course data.

## Getting Started

1. **Install Packages**:
   ```bash
   npm install
   ```

2. **Start Dev Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

## Development Commands

- `npm run lint`: Check for code style issues.
- `CI=false npm run build`: Build with warnings ignored (standard for Vercel/Netlify deployments).
