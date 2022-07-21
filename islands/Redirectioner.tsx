/** @jsx h */
import { h } from "preact";
import { useEffect } from "preact/hooks";

export default function Redirectioner({ url }: { url: string }) {
  useEffect(() => {
    if (url != null) window.location.href = url;
  }, []);

  if (url == null || url == "") {
    return <div>your url expires or not exits</div>;
  }
  return (
    <section>
        {url != null && <a href={url}>click here to redirect if the page doesn't work</a>}
    </section>
  );
}
