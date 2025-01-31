'use client';
import { Stage, Layer, Line, Rect, Circle } from 'react-konva';
import { useState } from 'react';
import type { KonvaEventObject } from 'konva/lib/Node';

export default function Canvas() {
  // حالة لتخزين الخطوط المرسومة
  const [lines, setLines] = useState<{ points: number[]; color: string }[]>([]);
  // حالة لتخزين الأشكال المرسومة (مستطيلات، دوائر، إلخ)
  const [shapes, setShapes] = useState<{ type: string; x: number; y: number; width: number; height: number; color: string }[]>([]);
  // حالة لتحديد ما إذا كان المستخدم يرسم حاليًا
  const [drawing, setDrawing] = useState(false);
  // حالة لتحديد لون الرسم الحالي
  const [color, setColor] = useState('#000000');
  // حالة لتحديد الأداة المستخدمة (قلم، ممسحة، مستطيل، دائرة)
  const [tool, setTool] = useState<'pen' | 'eraser' | 'rectangle' | 'circle'>('pen');
  // حالة لتخزين نقطة البداية عند رسم الأشكال
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);

  // 🖊️ بدء الرسم
  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    setDrawing(true); // تم تفعيل وضع الرسم
    const stage = e.target.getStage(); // الحصول على مرحلة الرسم (Stage)
    if (!stage) return;
    const pos = stage.getPointerPosition(); // الحصول على موقع المؤشر
    if (!pos) return;

    if (tool === 'pen' || tool === 'eraser') {
      // إذا كانت الأداة هي القلم أو الممسحة، نبدأ برسم خط جديد
      setLines([...lines, { points: [pos.x, pos.y], color: tool === 'eraser' ? '#ffffff' : color }]);
    } else {
      // إذا كانت الأداة هي المستطيل أو الدائرة، نحفظ نقطة البداية
      setStartPos(pos);
    }
  };

  // ✏️ أثناء الرسم
  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    if (!drawing) return; // إذا لم يكن المستخدم في وضع الرسم، نخرج من الدالة
    const stage = e.target.getStage(); // الحصول على مرحلة الرسم (Stage)
    if (!stage) return;
    const pos = stage.getPointerPosition(); // الحصول على موقع المؤشر
    if (!pos) return;

    if (tool === 'pen' || tool === 'eraser') {
      // إذا كانت الأداة هي القلم أو الممسحة، نضيف نقاطًا جديدة إلى الخط
      setLines((prevLines) => {
        const lastLine = { ...prevLines[prevLines.length - 1] };
        lastLine.points = [...lastLine.points, pos.x, pos.y];
        return [...prevLines.slice(0, -1), lastLine];
      });
    } else if (tool === 'rectangle' || tool === 'circle') {
      // إذا كانت الأداة هي المستطيل أو الدائرة، نحسب الأبعاد بناءً على نقطة البداية والموقع الحالي
      if (startPos) {
        const width = pos.x - startPos.x;
        const height = pos.y - startPos.y;
        setShapes((prevShapes) => {
          const newShapes = [...prevShapes];
          const lastShape = newShapes[newShapes.length - 1];
          if (lastShape && lastShape.type === tool) {
            // إذا كان الشكل الأخير من نفس النوع، نقوم بتحديث أبعاده
            lastShape.width = width;
            lastShape.height = height;
          } else {
            // إذا لم يكن الشكل الأخير من نفس النوع، نضيف شكلًا جديدًا
            newShapes.push({ type: tool, x: startPos.x, y: startPos.y, width, height, color });
          }
          return newShapes;
        });
      }
    }
  };

  // 🛑 إنهاء الرسم
  const handleMouseUp = () => {
    setDrawing(false); // نوقف وضع الرسم
    setStartPos(null); // نعيد نقطة البداية إلى القيمة الافتراضية
  };

  return (
    <div>
    <Stage
  width={1000}
  height={600}
  onMouseDown={handleMouseDown}
  onMouseMove={handleMouseMove}
  onMouseUp={handleMouseUp}
  className="border border-teal-600"
  style={{ backgroundColor: 'white' }} 

>
  {/* طبقة الخلفية لجعلها بيضاء */}
  

  {/* طبقة الرسم (Layer) */}
  <Layer>
    {/* رسم الخطوط */}
    {lines.map((line, i) => (
      <Line key={i} points={line.points} stroke={line.color} strokeWidth={3} tension={0.5} lineCap="round" lineJoin="round" />
    ))}

    {/* رسم الأشكال (مستطيلات ودوائر) */}
    {shapes.map((shape, i) => {
      if (shape.type === 'rectangle') {
        return <Rect key={i} x={shape.x} y={shape.y} width={shape.width} height={shape.height} fill={shape.color} />;
      } else if (shape.type === 'circle') {
        return <Circle key={i} x={shape.x + shape.width / 2} y={shape.y + shape.height / 2} radius={Math.abs(shape.width) / 2} fill={shape.color} />;
      }
      return null;
    })}
  </Layer>
</Stage>

      {/* أزرار التحكم */}
      <div className="mt-4 flex gap-2">
        <button onClick={() => setTool('pen')} className="bg-black text-white p-2 rounded">
          قلم
        </button>
        <button onClick={() => setTool('eraser')} className="bg-gray-500 text-white p-2 rounded">
          ممسحة
        </button>
        <button onClick={() => setTool('rectangle')} className="bg-green-500 text-white p-2 rounded">
          مستطيل
        </button>
        <button onClick={() => setTool('circle')} className="bg-blue-500 text-white p-2 rounded">
          دائرة
        </button>
        <button onClick={() => setColor('#ff0000')} className="bg-red-500 p-2 rounded">
          أحمر
        </button>
        <button onClick={() => setColor('#0000ff')} className="bg-blue-500 p-2 rounded">
          أزرق
        </button>
      </div>
    </div>
  );
}