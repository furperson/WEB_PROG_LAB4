import React, { useRef, useEffect } from 'react';

const Graph = ({ points, r, onGraphClick }) => {
    const canvasRef = useRef(null);
    const CANVAS_SIZE = 300;
    const AXIS_OFFSET = CANVAS_SIZE / 2; // Центр (150)

    const SCALE = 30;

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const currentR = r && r > 0 ? r : 0;

        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;

        // X
        ctx.beginPath();
        ctx.moveTo(0, AXIS_OFFSET);
        ctx.lineTo(CANVAS_SIZE, AXIS_OFFSET);
        ctx.stroke();

        //  Y
        ctx.beginPath();
        ctx.moveTo(AXIS_OFFSET, 0);
        ctx.lineTo(AXIS_OFFSET, CANVAS_SIZE);
        ctx.stroke();

        ctx.fillText("X", CANVAS_SIZE - 10, AXIS_OFFSET - 10);
        ctx.fillText("Y", AXIS_OFFSET + 10, 10);

        if (currentR > 0) {
            ctx.fillStyle = '#3399FF';

            const rPx = currentR * SCALE;
            const halfRPx = (currentR / 2) * SCALE;

            ctx.beginPath();

            ctx.moveTo(AXIS_OFFSET, AXIS_OFFSET);
            ctx.arc(AXIS_OFFSET, AXIS_OFFSET, rPx, -Math.PI / 2, 0);
            ctx.fill();

            ctx.fillRect(AXIS_OFFSET - halfRPx, AXIS_OFFSET - rPx, halfRPx, rPx);

            ctx.beginPath();
            ctx.moveTo(AXIS_OFFSET, AXIS_OFFSET); // Центр
            ctx.lineTo(AXIS_OFFSET - halfRPx, AXIS_OFFSET);
            ctx.lineTo(AXIS_OFFSET, AXIS_OFFSET + rPx);
            ctx.fill();

            ctx.fillStyle = "black";
            const tickSize = 5;

            const drawTickX = (val, label) => {
                const x = AXIS_OFFSET + val * SCALE;
                ctx.beginPath(); ctx.moveTo(x, AXIS_OFFSET - tickSize); ctx.lineTo(x, AXIS_OFFSET + tickSize); ctx.stroke();
                ctx.fillText(label, x, AXIS_OFFSET + 15);
            };
            const drawTickY = (val, label) => {
                const y = AXIS_OFFSET - val * SCALE; // Минус, т.к. Y вверх
                ctx.beginPath(); ctx.moveTo(AXIS_OFFSET - tickSize, y); ctx.lineTo(AXIS_OFFSET + tickSize, y); ctx.stroke();
                ctx.fillText(label, AXIS_OFFSET - 20, y);
            };

            drawTickX(currentR, "R");
            drawTickX(currentR / 2, "R/2");
            drawTickX(-currentR / 2, "-R/2");
            drawTickX(-currentR, "-R");

            drawTickY(currentR, "R");
            drawTickY(currentR / 2, "R/2");
            drawTickY(-currentR / 2, "-R/2");
            drawTickY(-currentR, "-R");
        } else {

            ctx.fillText("выберите R !!!!!!", AXIS_OFFSET, CANVAS_SIZE - 20);
        }

        points.forEach(p => {
            const pX = AXIS_OFFSET + p.x * SCALE;
            const pY = AXIS_OFFSET - p.y * SCALE;

            ctx.beginPath();
            ctx.arc(pX, pY, 4, 0, 2 * Math.PI);

            ctx.fillStyle = p.hit ? 'green' : 'red';

            ctx.fill();
            ctx.strokeStyle = '#000';
            ctx.stroke();
        });

    }, [points, r]);

    const handleClick = (e) => {
        if (!r || r <= 0) {
            alert("выбери R перед кликом!!!!!!!!!!!!");
            return;
        }

        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();

        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        const valX = (clickX - AXIS_OFFSET) / SCALE;
        const valY = (AXIS_OFFSET - clickY) / SCALE;

        onGraphClick(valX, valY);
    };

    return (
        <canvas
            ref={canvasRef}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            onClick={handleClick}
            style={{
                border: '1px solid #ccc',
                cursor: r > 0 ? 'crosshair' : 'not-allowed',
                backgroundColor: '#fff'
            }}
        />
    );
};

export default Graph;