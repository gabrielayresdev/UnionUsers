import React from "react";

function useFetch<T>(url: RequestInfo | URL, options?: RequestInit) {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [erro, setErro] = React.useState<Error | null>(null);

  // Desse modo, o useEffect não precisa ter options como dependência.
  const optionsRef = React.useRef(options);
  optionsRef.current = options;

  React.useEffect(() => {
    // Controle para interromper o fetch caso o componente seja desfeito
    const controller = new AbortController();
    const { signal } = controller;

    async function request() {
      try {
        setLoading(true);
        setData(null);
        const response = await fetch(url, {
          //Conecta o controller com o fetch.
          signal,
          ...optionsRef.current,
        });

        if (!response.ok) {
          const json = await response.json();
          const e = new Error(json.error);
          e.name = `${response.status}`;
          throw e;
        }
        const json = (await response.json()) as T;
        if (!signal.aborted) setData(json);
      } catch (err) {
        if (!signal.aborted && err instanceof Error) setErro(err);
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    }

    request();

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, loading, erro };
}

export default useFetch;
