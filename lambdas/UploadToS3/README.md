IAM (excessive):

- AmazonS3FullAccess
- CloudWatchLogsFullAccess

POST: https://fp136ljut3.execute-api.us-east-1.amazonaws.com/prod/upload-to-s3

Request body:

```json
{
  "category": "license",
  "id": "24206d94-c29d-4337-98cf-64c1d54cb149",
  "ext": "png",
  "img": "iVBORw0KGgoAAAANSUhEUgAAABQAAAARCAYAAADdRIy+AAABfGlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGAqSSwoyGFhYGDIzSspCnJ3UoiIjFJgv8PAzcDDIMRgxSCemFxc4BgQ4MOAE3y7xsAIoi/rgsxK8/x506a1fP4WNq+ZclYlOrj1gQF3SmpxMgMDIweQnZxSnJwLZOcA2TrJBUUlQPYMIFu3vKQAxD4BZIsUAR0IZN8BsdMh7A8gdhKYzcQCVhMS5AxkSwDZAkkQtgaInQ5hW4DYyRmJKUC2B8guiBvAgNPDRcHcwFLXkYC7SQa5OaUwO0ChxZOaFxoMcgcQyzB4MLgwKDCYMxgwWDLoMjiWpFaUgBQ65xdUFmWmZ5QoOAJDNlXBOT+3oLQktUhHwTMvWU9HwcjA0ACkDhRnEKM/B4FNZxQ7jxDLX8jAYKnMwMDcgxBLmsbAsH0PA4PEKYSYyjwGBn5rBoZt5woSixLhDmf8xkKIX5xmbARh8zgxMLDe+///sxoDA/skBoa/E////73o//+/i4H2A+PsQA4AJHdp4IxrEg8AAAGbaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA1LjQuMCI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjIwPC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjE3PC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CoNvIe8AAAIvSURBVDgRrZTPS1RRFMe/d9RmMMsfoDWLQFCCWgiVBpWkgVALiZhV0CKQsAjcVYsgqTb+C5pUQq1CnDa5mWJQjIgsiMAg+oERYpRhOQ419717Oue+mXGuzLw2ncd55913z/nc7z33zShiw3+0SCjr6w9gYARIzgDfV0NTC5PhwB1NQHMDkLgGxBNA/xXg8XyhtnyULYfaszfck272Ixvx2BDRhy9ly8IViobYFr55eddBTL8ADgwA6Zc8du3fwOmnIPiOg8dY5Z72XwYWPjlEJbqdN6WD+QVQz3n42XV+u5GmIFck8KP7gJmxYlVFhXT7IXTPIHLZDHK85T+squA5ftbshp1mXwGv34UD6cYt+OduwsuuWZgUa4ZqewXPnh0bC0XqeWUgPZqDuT5qFXgMksKg2Gc4K2qL81igok8W4fj2Y2UgRu5yGtmiAGgsKFDoIzp8Eer44TzM52j4jPiQ8ub0kLQHw/0I0mQ7pqhG1InrpWXUXr1glYlG28nWeIHHR1ViqroKZmvUnmcAI9DOJlsm2xOP9XWjZm87LyUfE2ysPtlbpDhAKAXqO2iTGMXRoO7SIFqmRlF75hRakuOIdnaAPFEm84Sa0ycQ2b+nCMTm3495/5ky9YdoBbtpCe30686DzSmUTc3SIlpppStB5ueaM+8q5HVU2y7EnoyjirclRsvfbCy9ZSYmsW3oLBrT96C215VOcUEFM1rT79Qcrd9POhnG8yi3WP6PQRL/AqaDwel2dO0IAAAAAElFTkSuQmCC"
}
```
