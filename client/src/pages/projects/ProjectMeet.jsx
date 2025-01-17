import React, { useState } from 'react';

const ProjectMeet = () => {
  const [isMeetingStarted, setIsMeetingStarted] = useState(false);
  const [meetingRoom, setMeetingRoom] = useState('');

  const startMeeting = () => {
    // Random room ID or use some identifier (e.g., project ID)
    const roomID = localStorage.getItem('pid');
    setMeetingRoom(roomID);
    setIsMeetingStarted(true);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-4">Project Meeting</h2>
      
      {!isMeetingStarted ? (
        <div className="flex justify-center">
          <button
            onClick={startMeeting}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Start Video Conference
          </button>
        </div>
      ) : (
        <div className="flex justify-center">
          <div style={{ width: '800px', height: '500px' }} className="relative">
            {/* Embed Jitsi Meet iframe */}
            <iframe
              src={`https://meet.jit.si/${meetingRoom}`}
              frameBorder="0"
              width="100%"
              height="100%"
              allow="camera; microphone; fullscreen; display-capture"
              title="Jitsi Meet Video Call"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectMeet ;
