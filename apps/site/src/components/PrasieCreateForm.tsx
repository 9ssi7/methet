import { useStore } from "@nanostores/preact";
import { useEffect, useState } from "preact/hooks";
import { praiseCreate } from "../api/praise.api";
import { isAuthenticated, token } from "../store/user";

export default function PrasieCreateForm() {
  const $isAuthenticated = useStore(isAuthenticated);
  const $token = useStore(token);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setTimeout(() => {
      if (!isAuthenticated.get()) {
        window.location.href = "/";
      }
    }, 5000);
  }, []);

  const onSubmit = (e: Event) => {
    e.preventDefault();
    praiseCreate(name, message, $token!)
      .then(() => {
        alert("Methiniz başarıyla iletilmiştir.");
        window.location.href = "/";
      })
      .catch((error) => {
        alert("Methiniz iletilirken bir hata oluştu.");
      });
  };

  if (!$isAuthenticated) return null;

  return (
    <form onSubmit={onSubmit} class="max-w-sm w-full pb-40 lg:pb-64">
      <div class="mb-5">
        <label
          for="username"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Kullanıcı Adı
        </label>
        <input
          id="username"
          class="border text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 bg-second placeholder-gray-400 text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
          placeholder="Örneğin 9ssi7"
          required
          value={name}
          onInput={(e) => setName((e.target as HTMLInputElement).value)}
        />
      </div>
      <div class="mb-5">
        <label
          for="message"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Methedin
        </label>
        <textarea
          id="message"
          class="border text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 bg-second placeholder-gray-400 text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
          required
          maxLength={500}
          rows={3}
          value={message}
          onInput={(e) => setMessage((e.target as HTMLTextAreaElement).value)}
        ></textarea>
      </div>
      <button
        type="submit"
        class="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
      >
        Gönder
      </button>
    </form>
  );
}
