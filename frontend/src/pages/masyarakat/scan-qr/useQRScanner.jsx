import { useState, useRef, useEffect } from 'react';

const useQRScanner = () => {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const startScanning = async () => {
    try {
      setError(null);
      setScanning(true);
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      
      streamRef.current = stream;
    } catch (err) {
      setError('Tidak dapat mengakses kamera: ' + err.message);
      setScanning(false);
    }
  };

  const stopScanning = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setScanning(false);
  };

  const simulateScan = (data) => {
    setScanning(false);
    setResult(data);
    
    // Simulate processing delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 1000);
    });
  };

  const resetScanner = () => {
    stopScanning();
    setResult(null);
    setError(null);
  };

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  return {
    scanning,
    result,
    error,
    videoRef,
    startScanning,
    stopScanning,
    simulateScan,
    resetScanner
  };
};

export default useQRScanner;