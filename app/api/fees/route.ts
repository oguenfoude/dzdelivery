import { NextRequest, NextResponse } from "next/server";
import { getCarrier } from "@/lib/carriers";
import { getWilaya, searchCommunes } from "@/lib/fees";

export function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const carrierId = params.get("carrier") ?? "redex";
  const wilayaParam = params.get("wilaya");
  const q = params.get("q") ?? "";

  const carrier = getCarrier(carrierId);
  if (!carrier) {
    return NextResponse.json({ error: `Unknown carrier: ${carrierId}` }, { status: 404 });
  }
  if (!carrier.active) {
    return NextResponse.json(
      { error: `Carrier '${carrierId}' is not active yet` },
      { status: 400 }
    );
  }
  if (!wilayaParam) {
    return NextResponse.json(
      { error: "Missing required query param: wilaya (e.g. /api/fees?carrier=redex&wilaya=16)" },
      { status: 400 }
    );
  }
  const wilayaId = Number(wilayaParam);
  if (!Number.isInteger(wilayaId) || wilayaId < 1 || wilayaId > 58) {
    return NextResponse.json({ error: "Invalid wilaya id (must be 1-58)" }, { status: 400 });
  }

  const wilaya = getWilaya(carrierId, wilayaId);
  if (!wilaya) {
    return NextResponse.json({ error: "Wilaya not found" }, { status: 404 });
  }

  const communes = searchCommunes(carrierId, wilayaId, q).map((c) => ({
    commune_id: c.commune_id,
    commune_name: c.commune_name,
    domicile_available: c.domicile.available,
    domicile_fee_da: c.domicile.fee_da,
    stop_desk_available: c.stop_desk.available,
    stop_desk_fee_da: c.stop_desk.fee_da,
  }));

  return NextResponse.json({
    carrier: carrierId,
    wilaya_id: wilaya.wilaya_id,
    wilaya_name: wilaya.wilaya_name,
    total_communes: communes.length,
    communes,
  });
}
