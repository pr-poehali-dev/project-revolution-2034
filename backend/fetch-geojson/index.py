import os
import json
import urllib.request
import boto3


def handler(event: dict, context) -> dict:
    """Скачивает GeoJSON карты мира и сохраняет в S3, возвращает CDN URL."""

    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
            "body": "",
        }

    s3 = boto3.client(
        "s3",
        endpoint_url="https://bucket.poehali.dev",
        aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
    )

    key = "geojson/ne_110m_land.geojson"

    # Проверяем, уже есть ли файл в S3
    try:
        s3.head_object(Bucket="files", Key=key)
        cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{key}"
        return {
            "statusCode": 200,
            "headers": {"Access-Control-Allow-Origin": "*", "Content-Type": "application/json"},
            "body": json.dumps({"url": cdn_url}),
        }
    except Exception:
        pass

    # Скачиваем с Natural Earth
    url = "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson"
    with urllib.request.urlopen(url, timeout=25) as resp:
        data = resp.read()

    s3.put_object(
        Bucket="files",
        Key=key,
        Body=data,
        ContentType="application/json",
    )

    cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{key}"
    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*", "Content-Type": "application/json"},
        "body": json.dumps({"url": cdn_url}),
    }
