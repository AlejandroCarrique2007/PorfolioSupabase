import { useState, type FormEvent } from 'react';
import { supabase } from '../../Model/utils/supabase';
import { CheckCircle2, UploadCloud } from 'lucide-react';

export default function AdminTrabajos() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [datetime, setDatetime] = useState('');
  const [description, setDescription] = useState('');
  const [href, setHref] = useState('');
  const [categoryTitle, setCategoryTitle] = useState('');
  const [categoryHref, setCategoryHref] = useState('');
  const [authorImageUrl, setAuthorImageUrl] = useState('');
  const [tecnologia, setTecnologia] = useState('');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setSuccess(null);
    setError(null);

    // Construir payload solo con campos que existen en la tabla
    const payload: any = {
      title: title.trim(),
      description: description.trim(),
    };

    // Agregar campos opcionales solo si tienen valor
    if (datetime.trim()) payload.datetime = datetime.trim();
    if (date.trim()) payload.date = date.trim();
    if (href.trim()) payload.href = href.trim();
    if (categoryTitle.trim()) payload.category_title = categoryTitle.trim();
    if (categoryHref.trim()) payload.category_href = categoryHref.trim();
    if (authorImageUrl.trim()) payload.author_image_url = authorImageUrl.trim();
    
    const tecArray = tecnologia
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
    if (tecArray.length > 0) payload.tecnologia = tecArray;

    try {
      const { error: insertError } = await supabase.from('Trabajos').insert([payload]);
      if (insertError) {
        setError(insertError.message);
      } else {
        setSuccess('Trabajo insertado correctamente en Supabase.');
        setTitle('');
        setDate('');
        setDatetime('');
        setDescription('');
        setHref('');
        setCategoryTitle('');
        setCategoryHref('');
        setAuthorImageUrl('');
        setTecnologia('');
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
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-600">Trabajos</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">Insertar nuevo trabajo</h1>
          <p className="mt-3 text-slate-600">
            Completa el formulario para crear un nuevo proyecto en Supabase sin recargar la página.
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
            <span className="text-sm font-medium">Título</span>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
              className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
              placeholder="Título del trabajo"
            />
          </label>

          <label className="grid gap-2 text-slate-700">
            <span className="text-sm font-medium">Fecha</span>
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required
              className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
            />
          </label>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <label className="grid gap-2 text-slate-700">
            <span className="text-sm font-medium">Hora / datetime</span>
            <input
              type="datetime-local"
              value={datetime}
              onChange={(event) => setDatetime(event.target.value)}
              className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
            />
          </label>

          <label className="grid gap-2 text-slate-700">
            <span className="text-sm font-medium">Enlace</span>
            <input
              type="url"
              value={href}
              onChange={(event) => setHref(event.target.value)}
              className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
              placeholder="https://..."
            />
          </label>
        </div>

        <label className="grid gap-2 text-slate-700">
          <span className="text-sm font-medium">Descripción</span>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
            rows={4}
            className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
            placeholder="Descripción breve del proyecto"
          />
        </label>

        <div className="grid gap-6 md:grid-cols-2">
          <label className="grid gap-2 text-slate-700">
            <span className="text-sm font-medium">Categoría</span>
            <input
              type="text"
              value={categoryTitle}
              onChange={(event) => setCategoryTitle(event.target.value)}
              required
              className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
              placeholder="Título de categoría"
            />
          </label>

          <label className="grid gap-2 text-slate-700">
            <span className="text-sm font-medium">Categoría href</span>
            <input
              type="text"
              value={categoryHref}
              onChange={(event) => setCategoryHref(event.target.value)}
              className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
              placeholder="/categoria"
            />
          </label>
        </div>

        <label className="grid gap-2 text-slate-700">
          <span className="text-sm font-medium">Imagen del autor</span>
          <input
            type="url"
            value={authorImageUrl}
            onChange={(event) => setAuthorImageUrl(event.target.value)}
            className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
            placeholder="URL de la imagen del autor"
          />
        </label>

        <label className="grid gap-2 text-slate-700">
          <span className="text-sm font-medium">Tecnologías</span>
          <input
            type="text"
            value={tecnologia}
            onChange={(event) => setTecnologia(event.target.value)}
            className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
            placeholder="React, TypeScript, Supabase"
          />
          <span className="text-xs text-slate-500">Separadas por coma</span>
        </label>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex w-full items-center justify-center rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {saving ? 'Insertando trabajo...' : 'Insertar trabajo'}
        </button>
      </form>
    </div>
  );
}
