import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { supabase } from "../../../supabaseClient.js";

export default function Account({ session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const [hasLoggedIn, setHasLoggedIn] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function getProfile() {
      setLoading(true);
      const { user } = session;

      const { data, error } = await supabase
        .from("profiles")
        .select(`username, avatar_url`)
        .eq("id", user.id)
        .single();

      if (!ignore) {
        if (error) {
          console.warn(error);
          toast.error("Failed to load profile.");
        } else if (data) {
          setUsername(data.username);
          setAvatarUrl(data.avatar_url);

          if (!hasLoggedIn) {
            setHasLoggedIn(true);
            toast.success("Signed in successfully.");
          }
        }
      }

      setLoading(false);
    }

    getProfile();

    return () => {
      ignore = true;
    };
  }, [session, hasLoggedIn]);

  async function updateProfile(event, avatarUrl) {
    event.preventDefault();

    setLoading(true);
    const { user } = session;

    const updates = {
      id: user.id,
      username,
      avatar_url: avatarUrl,
      updated_at: new Date(),
    };
    const { error } = await supabase.from("profiles").upsert(updates);

    if (!username) {
      toast.error("Please enter a valid username");
      return;
    }

    if (error) {
      toast.error(error.message);
    } else {
      setAvatarUrl(avatarUrl);
      toast.success("Profile updated successfully");
    }
    setLoading(false);
  }

  return (
    <form onSubmit={updateProfile} className="form-widget">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div>
        <label htmlFor="username">Name</label>
        <input
          id="username"
          type="text"
          required
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <button
          className="button block primary"
          type="submit"
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </button>
      </div>

      <div>
        <button
          className="button block"
          type="button"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      </div>
    </form>
  );
}
