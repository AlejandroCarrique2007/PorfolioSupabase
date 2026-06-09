import { useState, type FormEvent } from 'react';
import { insertFormacion, type NewFormacionPayload } from '../Model/api/main/apiformacion';

interface NewFormacionValues {
  nombre: string;
  descripcion: string;
  categoria: string;
  plataforma: string;
  horas: number | null;
  estado: string;
  calificacion: number | null;
  imagen_url: string;
}

const initialValues: NewFormacionValues = {
  nombre: '',
  descripcion: '',
  categoria: '',
  plataforma: '',
  horas: null,
  estado: 'Planeado',
  calificacion: null,
  imagen_url: '',
};

export default function NewFormacion() {
  const [values, setValues] = useState<NewFormacionValues>(initialValues);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof NewFormacionValues, value: string) => {
    setValues((current) => ({
      ...current,
      [field]: field === 'horas' || field === 'calificacion' ? (value === '' ? null : Number(value)) : value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setSuccess(null);
    setError(null);

    try {
      const payload: NewFormacionPayload = {
        nombre: values.nombre.trim(),
        descripcion: values.descripcion.trim() || null,
        categoria: values.categoria.trim() || null,
        plataforma: values.plataforma.trim() || null,
        horas: values.horas,
        estado: values.estado,
        calificacion: values.calificacion,
        imagen_url: values.imagen_url.trim() || null,
      };

      const { error } = await insertFormacion(payload);

      if (error) {
        setError(error.message);
      } else {
        setSuccess('Formulario de formación enviado correctamente a Supabase.');
        setValues(initialValues);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido al enviar el formulario.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm uppercase tracking-[0.28em] text-cyan-600">Nueva formación</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Questionario de formación</h1>
        <p className="mt-3 text-slate-600">
          Completa este cuestionario para enviar una nueva formación al backend de Supabase.
        </p>

        {success && (
          <div className="mt-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700">
            {success}
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-3xl border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        <form className="mt-8 grid gap-6" onSubmit={handleSubmit}>
          <div className="grid gap-6 md:grid-cols-2">
            <label className="grid gap-2 text-slate-700">
              <span className="text-sm font-medium">Nombre</span>
              <input
                type="text"
                value={values.nombre}
                onChange={(event) => handleChange('nombre', event.target.value)}
                required
                className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                placeholder="Nombre de la formación"
              />
            </label>

            <label className="grid gap-2 text-slate-700">
              <span className="text-sm font-medium">Categoría</span>
              <input
                type="text"
                value={values.categoria}
                onChange={(event) => handleChange('categoria', event.target.value)}
                className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                placeholder="Categoría"
              />
            </label>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <label className="grid gap-2 text-slate-700">
              <span className="text-sm font-medium">Plataforma</span>
              <input
                type="text"
                value={values.plataforma}
                onChange={(event) => handleChange('plataforma', event.target.value)}
                className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                placeholder="Plataforma o escuela"
              />
            </label>

            <label className="grid gap-2 text-slate-700">
              <span className="text-sm font-medium">Horas</span>
              <input
                type="number"
                min="0"
                value={values.horas ?? ''}
                onChange={(event) => handleChange('horas', event.target.value)}
                className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                placeholder="Duración en horas"
              />
            </label>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <label className="grid gap-2 text-slate-700">
              <span className="text-sm font-medium">Estado</span>
              <select
                value={values.estado}
                onChange={(event) => handleChange('estado', event.target.value)}
                className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
              >
                <option value="Planeado">Planeado</option>
                <option value="En progreso">En progreso</option>
                <option value="Completado">Completado</option>
              </select>
            </label>

            <label className="grid gap-2 text-slate-700">
              <span className="text-sm font-medium">Calificación</span>
              <input
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={values.calificacion ?? ''}
                onChange={(event) => handleChange('calificacion', event.target.value)}
                className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                placeholder="Calificación (0-10)"
              />
            </label>
          </div>

          <label className="grid gap-2 text-slate-700">
            <span className="text-sm font-medium">Descripción</span>
            <textarea
              value={values.descripcion}
              onChange={(event) => handleChange('descripcion', event.target.value)}
              rows={4}
              className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
              placeholder="Describe brevemente la formación"
            />
          </label>

          <label className="grid gap-2 text-slate-700">
            <span className="text-sm font-medium">URL de imagen</span>
            <input
              type="url"
              value={values.imagen_url}
              onChange={(event) => handleChange('imagen_url', event.target.value)}
              className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
              placeholder="Enlace a la imagen"
            />
          </label>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex w-full items-center justify-center rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {saving ? 'Enviando...' : 'Enviar formulario'}
          </button>
        </form>
      </section>
    </div>
  );
}
