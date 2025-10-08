export default async function Tenant({
  params,
}: {
  params: Promise<{ tenant: string }>;
}) {
  const { tenant } = await params;

  return (
    <main className="grow bg-linear-[130deg,var(--almond)_20%,var(--matcha)_80%] p-8">
      <h1 className="text-3xl font-bold">
        🎬 {tenant ?? "No Tenants"} Production House SaaS
      </h1>
      <p className="mt-4 text-gray-600">
        Manage shoots, crew, equipment, and expenses — all in one place.
      </p>
    </main>
  );
}
