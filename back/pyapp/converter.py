from collections import defaultdict

def convert_to_avg(a):
    # Группировка записей по дате и часу
    grouped = defaultdict(list)
    for record in a:
        key = (record['date'], record['hour'])
        grouped[key].append(record)
    
    days = []
    for key in grouped:
        date, hour_str = key
        hour = int(hour_str)
        records = grouped[key]
        count = len(records)
        
        # Вычисление средних значений для группы
        avg_pause = sum(r['avgPauseLen'] for r in records) / count
        avg_max_pause = sum(r['maxPauseLen'] for r in records) / count
        avg_duration = sum(r['duration'] for r in records) / count
        avg_rating = sum(r['rating'] for r in records) / count
        
        # Сбор средних рейтингов для каждой категории competition
        competitions = {}
        if records:
            sample_comp = records[0]['competitions']
            for category in sample_comp:
                total = sum(r['competitions'][category]['rating'] for r in records)
                avg = total / count
                competitions[category] = avg
        
        # Формирование объекта часа
        hour_entry = {
            'hour': hour,
            'rating': avg_rating,
            'competitions': competitions,
            'processedCallRecords': count,
            'avgPauseLen': avg_pause,
            'avgMaxPauseLen': avg_max_pause,
            'avgDuration': avg_duration
        }
        
        # Поиск или создание дня
        day_entry = None
        for day in days:
            if day['date'] == date:
                day_entry = day
                break
        if not day_entry:
            day_entry = {'date': date, 'hours': []}
            days.append(day_entry)
        day_entry['hours'].append(hour_entry)
    
    # Сортировка дней и часов
    days.sort(key=lambda d: d['date'])
    for day in days:
        day['hours'].sort(key=lambda h: h['hour'])
    
    # Вычисление общих средних
    total_records = len(a)
    avg_pause_total = sum(r['avgPauseLen'] for r in a) / total_records if total_records else 0
    avg_max_pause_total = sum(r['maxPauseLen'] for r in a) / total_records if total_records else 0
    avg_duration_total = sum(r['duration'] for r in a) / total_records if total_records else 0
    
    return {
        'avg': {
            'processedCallRecords': total_records,
            'avgPauseLen': avg_pause_total,
            'avgMaxPauseLen': avg_max_pause_total,
            'avgDuration': avg_duration_total
        },
        'days': days
    }