import SocialCards from "@/components/ui/card-fan-carousel";

const DEMO_CARDS = [
  { imgUrl: "https://cdn.21st.dev/assets/mirror/a6/a61a357faccddd302e85600234a02350a27f21b4cc8b3531578991614c050151.jpg", alt: "Mountain landscape" },
  { imgUrl: "https://cdn.21st.dev/assets/mirror/9d/9d12401d835b58b284c6380d9f9c745112d6e2ed6cc51942982d42ae1d8e08b0.jpg", alt: "City night" },
  { imgUrl: "https://cdn.21st.dev/assets/mirror/4c/4c0990c5eee66fc437f8e0ca2175c48ed6bebd9b3b6e45f1ac9b3542ada80eff.jpg", alt: "Foggy forest" },
  { imgUrl: "https://cdn.21st.dev/assets/mirror/05/05536dea31a97c7c4243f835d48e2c487cfeead267d4651a9b515987bef18e61.jpg", alt: "Sunlit woods" },
  { imgUrl: "https://cdn.21st.dev/assets/mirror/fe/fe3c057ea3c04ecd58640df79ace90545c86fc0e267b7cb87e4da93c8d0d0ffc.jpg", alt: "Tropical beach" },
  { imgUrl: "https://cdn.21st.dev/assets/mirror/ec/ec33bb1d53aef764ed557037ded0bf376df17ceb6de92411b60d8edcd68e75b2.jpg", alt: "Starry mountain" },
  { imgUrl: "https://cdn.21st.dev/assets/mirror/10/109a67c3a7eab23436b0fc0e45a2bdfc722c97cff452c14a2e5944e200c56d98.jpg", alt: "Golden sunset" },
  { imgUrl: "https://cdn.21st.dev/assets/mirror/9d/9d1fd650945e154a1a414af7188e43d1f0e334557c1ad2cf25315e4b39a98f96.jpg", alt: "Lake reflection" },
  { imgUrl: "https://cdn.21st.dev/assets/mirror/d2/d2b6671fa0140e374b5d7cc1c4a6b2210b48f304ff472a88a2ea1b4ca52f5b48.jpg", alt: "Green valley" },
  { imgUrl: "https://cdn.21st.dev/assets/mirror/1a/1adc3553fd7cb37113b52f179fc82de7ba497a8503afa2e1f27f717aba09a2bc.jpg", alt: "Sunbeam nature" },
];

export default function Demo() {
  return (
    <div className="min-h-screen flex items-center">
      <SocialCards cards={DEMO_CARDS} />
    </div>
  );
}

