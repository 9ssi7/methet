import { useStore } from "@nanostores/preact";
import { useEffect } from "preact/hooks";
import { finishLogin, getCurrentUser, startLogin } from "../api/auth.api";
import { isAuthenticated, token, user } from "../store/user";

export default function LoginButton() {
  const $isAuthenticated = useStore(isAuthenticated);
  const $user = useStore(user);

  useEffect(() => {
    const code = new URL(document.location.toString()).searchParams.get("code");
    const alreadyToken = localStorage.getItem("token");
    if (code && !$isAuthenticated) {
      finishLogin(code)
        .then(([res]) => {
          if (!res || "error" in res) return;
          isAuthenticated.set(true);
          token.set(res.token);
          localStorage.setItem("token", res.token);
          getCurrentUser(res.token).then(([current]) => {
            if (current) {
              user.set(current);
              window.location.href = "/";
            }
          });
        })
        .catch(() => {
          localStorage.removeItem("token");
          isAuthenticated.set(false);
          token.set(null);
          user.set(null);
        });
    } else if (!$isAuthenticated && alreadyToken) {
      getCurrentUser(alreadyToken).then(([current]) => {
        if (current) {
          user.set(current);
          isAuthenticated.set(true);
          token.set(alreadyToken);
        }
      });
    } else {
      isAuthenticated.set(false);
      token.set(null);
      user.set(null);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    isAuthenticated.set(false);
    token.set(null);
    user.set(null);
    window.location.href = "/";
  };

  const login = async () => {
    const [res] = await startLogin();
    if (res) {
      window.location.href = res.redirect_uri;
    }
  };

  return (
    <>
      {$isAuthenticated && (
        <div class="flex gap-2 items-center">
          {$user && (
            <div class="flex items-center gap-2 bg-first rounded-md px-2 py-2">
              <img
                class="w-5 h-5 rounded-full object-cover"
                src={$user.avatar_url}
              />
              <span class="text-white font-medium text-sm">{$user.login}</span>
            </div>
          )}
          <button
            onClick={logout}
            class="text-white focus:ring-0 font-medium rounded-md text-sm px-2 py-2 bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-rose-800"
          >
            Çıkış Yap
          </button>
        </div>
      )}
      {!$isAuthenticated && (
        <button
          onClick={login}
          class="text-white focus:ring-0 font-medium rounded-md text-sm px-2 py-2 bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-emerald-800"
        >
          Giriş Yap
        </button>
      )}
    </>
  );
}
