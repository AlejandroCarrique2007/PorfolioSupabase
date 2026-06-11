import { useEffect, useState, type FormEvent } from 'react';
import { supabase } from '../../Model/utils/supabase';

interface TrabajoAdmin {
  id: number;
  title: string;
  date: string | null;
  datetime: string | null;
  description: string;
  href: string | null;
  category_title: string | null;
  category_href: string | null;
  author_imageUrl: string | null;
  tecnologia: string[] | null;
}

export default function AdminTrabajos() {
  const [trabajos, setTrabajos] = useState<TrabajoAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

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

  const fetchTrabajos = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('Trabajos')
        .select('*')
        .order('date', { ascending: false });

      if (fetchError) {
        setError(fetchError.message);
      } else {
        setTrabajos(data || []);
        setError(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchTrabajos();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setSuccess(null);
    setError(null);

    const tecnos = tecnologia
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    const payload = {
      title: title.trim() || null,
      datetime: datetime.trim() || date.trim() || null,
      date: date.trim() || null,
      description: description.trim() || null,
      href: href.trim() || null,
      category_title: categoryTitle.trim() || null,
      category_href: categoryHref.trim() || null,
      author_imageUrl: authorImageUrl.trim() || null,
      tecnologia: tecnos.length ? tecnos : null,
    };

    const filteredPayload = Object.fromEntries(
      Object.entries(payload).filter(
        ([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0)
      )
    );

    try {
      if (editingId !== null) {
        // Modo edición
        const { data, error: updateError } = await supabase
          .from('Trabajos')
          .update(filteredPayload)
          .eq('id', editingId)
          .select();
        
        if (updateError) {
          setError(updateError.message);
          return;
        }

        setSuccess('Trabajo actualizado correctamente.');
        setTrabajos((prev) =>
          prev.map((item) => (item.id === editingId && data && data.length > 0 ? data[0] : item))
        );
        handleCancelEdit();
      } else {
        // Modo inserción
        const { data, error: insertError } = await supabase.from('Trabajos').insert([filteredPayload]).select();
        if (insertError) {
          setError(insertError.message);
          return;
        }

        const created = data?.[0] as TrabajoAdmin | undefined;
        if (created) {
          setTrabajos((prev) => [created, ...prev]);
        } else {
          await fetchTrabajos();
        }

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

  const handleEdit = (trabajo: TrabajoAdmin) => {
    setEditingId(trabajo.id);
    setTitle(trabajo.title);
    setDate(trabajo.date || '');
    setDatetime(trabajo.datetime || '');
    setDescription(trabajo.description || '');
    setHref(trabajo.href || '');
    setCategoryTitle(trabajo.category_title || '');
    setCategoryHref(trabajo.category_href || '');
    setAuthorImageUrl(trabajo.author_imageUrl || '');
    setTecnologia(trabajo.tecnologia?.join(', ') || '');
    setIsFormOpen(true);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle('');
    setDate('');
    setDatetime('');
    setDescription('');
    setHref('');
    setCategoryTitle('');
    setCategoryHref('');
    setAuthorImageUrl('');
    setTecnologia('');
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm('¿Eliminar este proyecto de Supabase?');
    if (!confirmed) return;

    try {
      const { error: deleteError } = await supabase.from('Trabajos').delete().eq('id', id);
      if (deleteError) {
        setError(deleteError.message);
        return;
      }
      setTrabajos((prev) => prev.filter((item) => item.id !== id));
      setSuccess('Proyecto eliminado correctamente.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error eliminando el proyecto.');
    }
  };

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-600">Trabajos</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">Gestión de trabajos</h2>
            <p className="mt-3 text-slate-600">Añade trabajos reales y observa el listado actualizado inmediatamente.</p>
          </div>
          <button
            type="button"
            onClick={() => setIsFormOpen((prev) => !prev)}
            className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            {isFormOpen ? 'Ocultar formulario' : 'Mostrar formulario'}
          </button>
        </div>
      </section>

      {isFormOpen && (
        <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <h3 className="text-2xl font-semibold text-slate-900">{editingId ? 'Editar trabajo' : 'Agregar trabajo'}</h3>
          <p className="mt-2 text-slate-600">{editingId ? 'Modifica los datos del trabajo.' : 'Rellena el formulario y pulsa guardar para añadir el trabajo a Supabase.'}</p>

          {success && <div className="mt-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700">{success}</div>}
          {error && <div className="mt-6 rounded-3xl border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>}

          <form className="mt-6 grid gap-6" onSubmit={handleSubmit}>
            <div className="grid gap-6 md:grid-cols-2">
              <label className="grid gap-2 text-slate-700">
                <span className="text-sm font-medium">Título</span>
                <input
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  required
                  className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                  placeholder="Título del proyecto"
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
              {saving ? (editingId ? 'Actualizando...' : 'Guardando...') : (editingId ? 'Actualizar trabajo' : 'Guardar trabajo')}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="inline-flex w-full items-center justify-center rounded-3xl bg-slate-200 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-300"
              >
                Cancelar edición
              </button>
            )}
          </form>
        </section>
      )}

      <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-600">Trabajos</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">Listado de trabajos</h2>
            <p className="mt-3 text-slate-600">Los trabajos añadidos se muestran aquí y se guardan en Supabase.</p>
          </div>
          <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
            {loading ? 'Cargando...' : `${trabajos.length} trabajos`}
          </span>
        </div>

        {loading ? (
          <div className="mt-8 rounded-[28px] border border-slate-200 bg-slate-50 p-8 text-slate-600">Cargando trabajos...</div>
        ) : error ? (
          <div className="mt-8 rounded-[28px] border border-red-200 bg-red-50 p-8 text-red-700">{error}</div>
        ) : trabajos.length === 0 ? (
          <div className="mt-8 rounded-[28px] border border-slate-200 bg-slate-50 p-8 text-slate-600">No hay trabajos guardados.</div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {trabajos.map((trabajo) => (
              <article key={trabajo.id} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">{trabajo.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">{trabajo.category_title || 'Sin categoría'}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => void handleEdit(trabajo)}
                      className="rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-100"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => void handleDelete(trabajo.id)}
                      className="rounded-full bg-red-50 px-4 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div>
                    <span className="text-xs uppercase tracking-[0.24em] text-slate-500">Fecha</span>
                    <p className="mt-1 text-sm text-slate-700">{trabajo.date || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-[0.24em] text-slate-500">Enlace</span>
                    <p className="mt-1 text-sm text-cyan-700">
                      {trabajo.href ? (
                        <a href={trabajo.href} target="_blank" rel="noreferrer" className="underline">
                          Ver enlace
                        </a>
                      ) : (
                        'Sin enlace'
                      )}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-600">{trabajo.description || 'Sin descripción'}</p>

                {trabajo.tecnologia && trabajo.tecnologia.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {trabajo.tecnologia.map((tech, index) => (
                      <span key={index} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
