import { useState, type FormEvent } from 'react';
import { supabase } from '../../Model/utils/supabase';
import type { ICurso } from '../../Model/interfaces/ICurso';
import { CheckCircle2, UploadCloud } from 'lucide-react';

export default function AdminCursos() {
  const [form, setForm] = useState<ICurso>({
    titulo: '',
    academia: '',
    categoria: '',
    precio: null,
    imagen: '',
  });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof ICurso, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: field === 'precio' ? (value === '' ? null : Number(value)) : value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setSuccess(null);
    setError(null);

    // Construir payload solo con los campos esenciales
    const payload: any = {
      titulo: form.titulo.trim(),
    };

    // Agregar campos opcionales si existen
    if (form.categoria.trim()) payload.categoria = form.categoria.trim();
    if (form.precio) payload.precio = form.precio;
    if (form.imagen.trim()) payload.imagen = form.imagen.trim();

    try {
      const { error: insertError } = await supabase.from('Cursos').insert([payload]);
      if (insertError) {
        setError(insertError.message);
      } else {
        setSuccess('Curso insertado correctamente en Supabase.');
        setForm({ titulo: '', academia: '', categoria: '', precio: null, imagen: '' });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-600">Cursos</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Insertar nuevo curso</h1>
            <p className="mt-3 text-slate-600">
              Llena este formulario para crear un nuevo curso en Supabase sin recargar la página.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-4 py-2 text-sm text-cyan-700">
            <UploadCloud size={18} />
            Envío directo a Supabase
          </div>
        </div>

        {success && (
          <div className="mt-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700">
            <div className="flex items-center gap-2">
              <CheckCircle2 />
              <span>{success}</span>
            </div>
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
              <span className="text-sm font-medium">Título</span>
              <input
                type="text"
                value={form.titulo}
                onChange={(event) => handleChange('titulo', event.target.value)}
                required
                className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                placeholder="Título del curso"
              />
            </label>

            <label className="grid gap-2 text-slate-700">
              <span className="text-sm font-medium">Academia</span>
              <input
                type="text"
                value={form.academia}
                onChange={(event) => handleChange('academia', event.target.value)}
                required
                className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                placeholder="Academia del curso"
              />
            </label>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <label className="grid gap-2 text-slate-700">
              <span className="text-sm font-medium">Categoría</span>
              <input
                type="text"
                value={form.categoria}
                onChange={(event) => handleChange('categoria', event.target.value)}
                className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                placeholder="Categoría del curso"
              />
            </label>

            <label className="grid gap-2 text-slate-700">
              <span className="text-sm font-medium">Precio</span>
              <input
                type="number"
                min="0"
                value={form.precio ?? ''}
                onChange={(event) => handleChange('precio', event.target.value)}
                className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                placeholder="Precio del curso"
              />
            </label>
          </div>

          <label className="grid gap-2 text-slate-700">
            <span className="text-sm font-medium">Imagen</span>
            <input
              type="url"
              value={form.imagen}
              onChange={(event) => handleChange('imagen', event.target.value)}
              className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
              placeholder="URL de la imagen"
            />
          </label>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex w-full items-center justify-center rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {saving ? 'Insertando curso...' : 'Insertar curso'}
          </button>
        </form>
      </section>
    </div>
  );
}
