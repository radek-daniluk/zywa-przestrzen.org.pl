#!/bin/sh


if [ $# -lt 1 ]; then
  echo "Argument number mismatch. Give input file and optionally output basename."
  exit 1
fi

inname="$1"
inbase=$(basename "$inname" | cut -d. -f1)

if [ $# -eq 1 ]; then
  outbase=$inbase
else
  outbase="$2"
fi

if [ ! -f $inname ]; then
  echo "No such file: $inname"
  exit 2
fi

if [ ! -d ./assets/img ]; then
  echo "No assets/img dir in current dir. Please change or create dir(s)."
  exit 3
fi

if [ ! -d ./assets/img/300 ]; then
  echo "No ./assets/img/300 dir. Please change or create dir(s)."
  exit 3
fi

if [ ! -d ./assets/img/600 ]; then
  echo "No ./assets/img/600 dir. Please change or create dir(s)."
  exit 3
fi

if [ ! -d ./assets/img/740 ]; then
  echo "No ./assets/img/740 dir. Please change or create dir(s)."
  exit 3
fi

echo $inbase
echo $outbase

cwebp -resize 300 0 -m 6 -o "./assets/img/300/$outbase.webp" "$inname"
cwebp -resize 600 0 -m 6 -o "./assets/img/600/$outbase.webp" "$inname"
cwebp -resize 740 0 -m 6 -o "./assets/img/740/$outbase.webp" "$inname"

convert -resize 300 "$inname" "./assets/img/300/$outbase.jpg"
convert -resize 600 "$inname" "./assets/img/600/$outbase.jpg"
convert -resize 740 "$inname" "./assets/img/740/$outbase.jpg"
