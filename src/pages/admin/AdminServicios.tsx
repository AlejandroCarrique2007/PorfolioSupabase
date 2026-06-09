import { useState, type FormEvent } from 'react';
import { supabase } from '../../Model/utils/supabase';
import { CheckCircle2, UploadCloud } from 'lucide-react';

export default function AdminServicios() {
  const [servicio, setServicio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [detalles, setDetalles] = useState('');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setSuccess(null);
    setError(null);

    const payload = {
      servicio: servicio.trim(),
      descripcion: descripcion.trim(),
      detalles: detalles
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    };

    try {
      const { error: insertError } = await supabase.from('Servicios').insert([payload]);
      if (insertError) {
        setError(insertError.message);
      } else {
        setSuccess('Servicio insertado correctamente en Supabase.');
        setServicio('');
        setDescripcion('');
        setDetalles('');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-600">Servicios</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">Insertar nuevo servicio</h1>
          <p className="mt-3 text-slate-600">
            Completa el formulario para crear un servicio nuevo en Supabase sin recargar la página.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-4 py-2 text-sm text-cyan-700">
          <UploadCloud size={18} />
          Envío directo a Supabase
        </div>
      </div>

      {success && (
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700">
          <div className="flex items-center gap-2">
            <CheckCircle2 />
            <span>{success}</span>
          </div>
        </div>
      )}

      {error && (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>
      )}

      <form className="grid gap-6" onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <label className="grid gap-2 text-slate-700">
            <span className="text-sm font-medium">Servicio</span>
            <input
              type="text"
              value={servicio}
              onChange={(event) => setServicio(event.target.value)}
              required
              className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
              placeholder="Nombre del servicio"
            />
          </label>

          <label className="grid gap-2 text-slate-700">
            <span className="text-sm font-medium">Descripción</span>
            <input
              type="text"
              value={descripcion}
              onChange={(event) => setDescripcion(event.target.value)}
              required
              className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
              placeholder="Breve descripción"
            />
          </label>
        </div>

        <label className="grid gap-2 text-slate-700">
          <span className="text-sm font-medium">Detalles</span>
          <input
            type="text"
            value={detalles}
            onChange={(event) => setDetalles(event.target.value)}
            className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
            placeholder="Ej: Diseño web, SEO, mantenimiento"
          />
          <span className="text-xs text-slate-500">Separados por coma</span>
        </label>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex w-full items-center justify-center rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {saving ? 'Insertando servicio...' : 'Insertar servicio'}
        </button>
      </form>
    </div>
  );
}
