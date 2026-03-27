'use client';

import { useRef, useState } from 'react';
import { Download, RotateCcw, Loader2 } from 'lucide-react';
import { analytics } from '@/lib/analytics';

const TEAMS = [
  { id: 'csk', name: 'CSK', color: '#FFD700', textColor: '#000000' },
  { id: 'mi', name: 'MI', color: '#0066CC', textColor: '#FFFFFF' },
  { id: 'rcb', name: 'RCB', color: '#DC143C', textColor: '#FFFFFF' },
  { id: 'kkr', name: 'KKR', color: '#9370DB', textColor: '#FFFFFF' },
  { id: 'srh', name: 'SRH', color: '#FF6600', textColor: '#FFFFFF' },
  { id: 'rr', name: 'RR', color: '#4B0082', textColor: '#FFFFFF' },
  { id: 'dc', name: 'DC', color: '#1E90FF', textColor: '#FFFFFF' },
  { id: 'pbks', name: 'PBKS', color: '#DC143C', textColor: '#FFFFFF' },
  { id: 'lsg', name: 'LSG', color: '#00A86B', textColor: '#FFFFFF' },
  { id: 'gt', name: 'GT', color: '#1E90FF', textColor: '#FFFFFF' },
];

export function JerseyFaceOverlay() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<string>('csk');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [faceX, setFaceX] = useState(200);
  const [faceY, setFaceY] = useState(80);
  const [faceSize, setFaceSize] = useState(120);

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = event.target?.result as string;
      setUploadedImage(img);
      setProcessedImage(null);
      //analytics.jerseyPhotoUploaded();
    };
    reader.readAsDataURL(file);
  };

  // Detect face and apply to jersey
  const processImage = async () => {
    if (!uploadedImage || !canvasRef.current) return;

    setIsProcessing(true);

    try {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Canvas size for jersey
        canvas.width = 500;
        canvas.height = 600;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Draw jersey background
        drawJersey(ctx, selectedTeam);

        // Extract face from uploaded image
        extractAndDrawFace(ctx, img, faceX, faceY, faceSize);

        // Get result
        const result = canvas.toDataURL('image/png');
        setProcessedImage(result);
        //sanalytics.jerseyApplied(selectedTeam);
      };
      img.src = uploadedImage;

      setIsProcessing(false);
    } catch (error) {
      console.error('Error processing:', error);
      setIsProcessing(false);
    }
  };

  // Draw jersey template
  const drawJersey = (ctx: CanvasRenderingContext2D, teamId: string) => {
    const team = TEAMS.find((t) => t.id === teamId);
    if (!team) return;

    // Jersey background (gradient)
    const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
    gradient.addColorStop(0, team.color);
    gradient.addColorStop(1, adjustColor(team.color, -30));

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Jersey shape with rounded corners
    ctx.fillStyle = team.color;
    ctx.beginPath();
    ctx.roundRect(50, 220, 400, 320, [20, 20, 10, 10]);
    ctx.fill();

    // Darker jersey gradient for depth
    const jerseyGradient = ctx.createLinearGradient(50, 220, 50, 540);
    jerseyGradient.addColorStop(0, team.color);
    jerseyGradient.addColorStop(1, adjustColor(team.color, -40));
    ctx.fillStyle = jerseyGradient;
    ctx.fillRect(50, 220, 400, 320);

    // Jersey outline
    ctx.strokeStyle = adjustColor(team.color, -50);
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(50, 220, 400, 320, [20, 20, 10, 10]);
    ctx.stroke();

    // Collar area
    ctx.fillStyle = adjustColor(team.color, -30);
    ctx.fillRect(200, 200, 100, 30);

    // Team name on jersey
    ctx.fillStyle = team.textColor;
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(team.name, 250, 380);

    // Jersey number
    const number = Math.floor(Math.random() * 99 + 1);
    ctx.font = 'bold 80px Arial';
    ctx.fillText(number.toString(), 250, 480);

    // Sleeves
    ctx.fillStyle = adjustColor(team.color, -50);
    ctx.fillRect(10, 270, 40, 80);
    ctx.fillRect(450, 270, 40, 80);

    // Stripe pattern
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 6; i++) {
      const x = 80 + i * 65;
      ctx.beginPath();
      ctx.moveTo(x, 220);
      ctx.lineTo(x, 540);
      ctx.stroke();
    }

    // IPL badge area
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.beginPath();
    ctx.arc(450, 250, 25, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = team.textColor;
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('IPL', 450, 250);
  };

  // Extract face from image and draw on jersey
  const extractAndDrawFace = (
    ctx: CanvasRenderingContext2D,
    sourceImg: HTMLImageElement,
    x: number,
    y: number,
    size: number
  ) => {
    // Detect face in source image
    const detectedFace = detectFace(sourceImg);

    // Create temp canvas to extract face
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = size;
    tempCanvas.height = size;
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return;

    // Extract face region from source
    tempCtx.drawImage(
      sourceImg,
      detectedFace.x,
      detectedFace.y,
      detectedFace.width,
      detectedFace.height,
      0,
      0,
      size,
      size
    );

    // Draw circular face on jersey
    const radius = size / 2;
    ctx.save();

    // Create circular clipping path
    ctx.beginPath();
    ctx.arc(x + radius, y + radius, radius, 0, Math.PI * 2);
    ctx.clip();

    // Draw extracted face
    ctx.drawImage(tempCanvas, x, y);

    ctx.restore();

    // Draw face border
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(x + radius, y + radius, radius, 0, Math.PI * 2);
    ctx.stroke();

    // Shadow effect
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 10;
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x + radius, y + radius, radius + 3, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowColor = 'transparent';
  };

  // Simple face detection
  const detectFace = (img: HTMLImageElement) => {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = img.width;
    tempCanvas.height = img.height;
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return { x: 0, y: 0, width: 0, height: 0 };

    tempCtx.drawImage(img, 0, 0);
    const imageData = tempCtx.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;

    // Detect skin pixels
    const skinPixels: { x: number; y: number }[] = [];
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      if (
        r > 95 &&
        g > 40 &&
        b > 20 &&
        r > g &&
        r > b &&
        Math.abs(r - g) > 15
      ) {
        const pixelIndex = i / 4;
        const px = pixelIndex % img.width;
        const py = Math.floor(pixelIndex / img.width);
        skinPixels.push({ x: px, y: py });
      }
    }

    if (skinPixels.length === 0) {
      return {
        x: img.width / 2 - 75,
        y: img.height / 4 - 75,
        width: 150,
        height: 150,
      };
    }

    // Find bounding box
    const xs = skinPixels.map((p) => p.x);
    const ys = skinPixels.map((p) => p.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    return {
      x: minX,
      y: minY,
      width: Math.max(maxX - minX, 100),
      height: Math.max(maxY - minY, 100),
    };
  };

  // Adjust color brightness
  const adjustColor = (color: string, percent: number): string => {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, Math.min(255, (num >> 16) + amt));
    const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amt));
    const B = Math.max(0, Math.min(255, (num & 0x0000ff) + amt));
    return '#' + (0x1000000 + (R << 16) + (G << 8) + B).toString(16).slice(1);
  };

  // Download image
  const downloadImage = () => {
    if (!processedImage) return;
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = `jersey-${selectedTeam}-${Date.now()}.png`;
    link.click();
    //analytics.jerseyPhotoDownloaded(selectedTeam);
  };

  // Reset
  const resetEditor = () => {
    setUploadedImage(null);
    setProcessedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div ref={containerRef} className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold mb-2">👕 Your Face on Jersey</h2>
        <p className="text-muted-foreground text-lg">
          Upload your photo, select a team jersey, and see yourself in your favorite team's colors!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Team & Upload */}
        <div className="space-y-6">
          {/* Team Selection */}
          <div>
            <label className="text-sm font-bold mb-3 block uppercase">Select Team Jersey</label>
            <div className="grid grid-cols-2 gap-2">
              {TEAMS.map((team) => (
                <button
                  key={team.id}
                  onClick={() => setSelectedTeam(team.id)}
                  className={`p-3 rounded-lg border-2 transition-all font-bold ${
                    selectedTeam === team.id
                      ? 'border-primary scale-105'
                      : 'border-border hover:border-primary/50'
                  }`}
                  style={{
                    backgroundColor: selectedTeam === team.id ? team.color : 'transparent',
                    color: selectedTeam === team.id ? team.textColor : 'inherit',
                  }}
                >
                  {team.name}
                </button>
              ))}
            </div>
          </div>

          {/* Upload Photo */}
          <div>
            {!uploadedImage ? (
              <div
                className="border-2 border-dashed border-primary/50 rounded-lg p-6 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
                onClick={() => fileInputRef.current?.click()}
              >
                <p className="text-5xl mb-3">📸</p>
                <p className="font-bold mb-2">Upload Your Photo</p>
                <p className="text-xs text-muted-foreground mb-4">
                  Clear selfie works best
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold text-sm">
                  Upload
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="border border-border rounded-lg overflow-hidden bg-black">
                  <img
                    src={uploadedImage}
                    alt="Uploaded"
                    className="w-full max-h-40 object-cover"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 px-3 py-2 text-sm border border-border rounded-lg hover:bg-secondary transition-colors"
                  >
                    Change Photo
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center: Preview */}
        <div className="space-y-4">
          <label className="text-sm font-bold block uppercase">Preview</label>
          <div className="border border-border rounded-lg overflow-hidden bg-black aspect-[5/6]">
            {processedImage ? (
              <img src={processedImage} alt="Result" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm text-center p-4">
                Your jersey will appear here
              </div>
            )}
          </div>
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Right: Controls & Download */}
        <div className="space-y-6">
          {uploadedImage && (
            <>
              {/* Generate Button */}
              <button
                onClick={processImage}
                disabled={isProcessing}
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-all font-bold text-lg flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating...
                  </>
                ) : (
                  '✨ Create Jersey'
                )}
              </button>

              {/* Adjustments */}
              <div className="p-4 bg-card rounded-lg border border-border space-y-4">
                <p className="text-sm font-bold">Fine-tune Face</p>

                <div>
                  <label className="text-xs text-muted-foreground block mb-2">
                    Left/Right: {faceX}
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="350"
                    value={faceX}
                    onChange={(e) => setFaceX(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-xs text-muted-foreground block mb-2">
                    Up/Down: {faceY}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={faceY}
                    onChange={(e) => setFaceY(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-xs text-muted-foreground block mb-2">
                    Size: {faceSize}
                  </label>
                  <input
                    type="range"
                    min="80"
                    max="200"
                    value={faceSize}
                    onChange={(e) => setFaceSize(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                {processedImage && (
                  <button
                    onClick={processImage}
                    disabled={isProcessing}
                    className="w-full px-3 py-2 text-sm bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                  >
                    Update Preview
                  </button>
                )}
              </div>
            </>
          )}

          {/* Download */}
          {processedImage && (
            <div className="space-y-2">
              <button
                onClick={downloadImage}
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-bold flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download
              </button>
              <button
                onClick={resetEditor}
                className="w-full px-6 py-3 border border-border rounded-lg hover:bg-secondary transition-all font-bold flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Try Another
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tips */}
      <div className="mt-8 p-4 bg-card rounded-lg border border-border text-sm text-muted-foreground">
        <p className="mb-2">💡 <strong>Tips:</strong></p>
        <ul className="list-disc list-inside space-y-1">
          <li>Select your favorite team jersey first</li>
          <li>Upload a clear photo with your face visible</li>
          <li>Click "Create Jersey" to automatically place your face</li>
          <li>Fine-tune position and size with the sliders if needed</li>
          <li>Download and share with your friends!</li>
        </ul>
      </div>
    </div>
  );
}
