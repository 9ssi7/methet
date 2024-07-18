import { useStore } from "@nanostores/preact";
import { user } from "../store/user";

export default function WelcomeBanner() {
  const $user = useStore(user);

  if (!$user) return null;

  return (
    <section class="flex flex-col gap-2 bg-second rounded-md p-4 my-4">
      <h2 class="text-2xl">Hoş geldin, {$user.name}</h2>
      <p class="text-gray-500">
        Seni görmek güzel! Birilerini methetmek ister misin?
      </p>
      <a href="/respect" class="text-emerald-500">
        Saygını göster! 🌟
      </a>
    </section>
  );
}
